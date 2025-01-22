import { useEffect, useState } from "react";
import { useStore } from "../../../store/useStore";
import { AppButton } from "../../common/cmps/AppButton";
import { AppDialog } from "../../common/cmps/AppDialog";
import { UploadProgress } from "../../common/cmps/UploadProgress";
import { firebase } from "../../../firebase/firebase";
import { UploadTaskSnapshot, StorageError } from 'firebase/storage';

interface Props {
    mediaType: "image" | "video" | "audio" | "choose";
    id: string; // Unique identifier for the instance
    isHeaderAudio?: boolean;
}

const mediaTypeToSrcKey = {
    'image': 'photoSrc',
    'video': 'videoSrc',
    'audio': 'audioSrc'
} as const;

export const MediaCmpContainer = ({ mediaType, id, isHeaderAudio }: Props) => {
    const isEditMode = useStore((state) => state.isEditMode);
    const mediaState = useStore((state) => state.mediaState);
    const setMediaState = useStore((state) => state.setMediaState);
    // get uer from store
    const user = useStore((state) => state.user);

    const instanceState = mediaState[id] || {
        photoSrc: null,
        videoSrc: null,
        audioSrc: null,
        currMediaType: null,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadTask, setUploadTask] = useState<any>(null);

    const { photoSrc, videoSrc, audioSrc, currMediaType } = instanceState;


    useEffect(() => {
        if (mediaType === "choose") return;
        setMediaState(id, { currMediaType: mediaType });
    }, [mediaType, id, setMediaState]);

    // Add new useEffect to handle user changes
    useEffect(() => {
        if (user) {
            console.log('User changed, reloading media for:', { mediaType, id });
            loadExistingMedia();
        }
    }, [user?.name]); // Depend on user.name to reload when user changes

    useEffect(() => {
        if (uploadError) {
            const timer = setTimeout(() => {
                setUploadError(null);
            }, 5000); // 5 seconds
            return () => clearTimeout(timer);
        }
    }, [uploadError]);

    const deleteExistingMedia = async (mediaType: string) => {
        try {
            const mediaFolder = `${user?.name || 'unassigned'}/media/${mediaType}s/${id}`;
            const listRef = firebase.storageRef(firebase.storage, mediaFolder);
            const result = await firebase.listAll(listRef);
            
            // Delete existing files
            for (const item of result.items) {
                await firebase.deleteObject(item);
            }
        } catch (error) {
            console.error("Error deleting media:", error);
        }
    };

    const cancelUpload = () => {
        if (uploadTask) {
            uploadTask.cancel();
            setIsUploading(false);
            setUploadProgress(0);
            setUploadTask(null);
        }
    };

    const handleMediaUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        mediaType: "image" | "video" | "audio",
    ) => {
        const file = event.target.files?.[0];
        console.log('Starting upload for file:', { name: file?.name, size: file?.size, type: file?.type });
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        try {
            await deleteExistingMedia(mediaType);

            const storageReference = firebase.storageRef(
                firebase.storage,
                `${user?.name || 'unassigned'}/media/${mediaType}s/${id}/${file.name}`
            );
            
            const task = firebase.uploadBytesResumable(storageReference, file);
            setUploadTask(task);
            
            task.on('state_changed',
                (snapshot: UploadTaskSnapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload progress:', progress.toFixed(1) + '%');
                },
                (error: StorageError) => {
                    console.error("Error during upload:", error);
                    if (error.code === 'storage/canceled') {
                        setUploadError('Upload canceled');
                    } else {
                        setUploadError(`Upload failed: ${error.message}`);
                    }
                    setIsUploading(false);
                    setUploadTask(null);
                },
                async () => {
                    const downloadURL = await firebase.getDownloadURL(storageReference);
                    console.log('Upload complete. URL:', downloadURL);
                    setMediaState(id, { [mediaTypeToSrcKey[mediaType]]: downloadURL });
                    setIsModalOpen(false);
                    setIsUploading(false);
                    setUploadTask(null);
                }
            );
        } catch (error: any) {
            console.error("Error uploading file:", error);
            setUploadError(`Upload failed: ${error?.message || 'Unknown error'}`);
            setIsUploading(false);
            setUploadTask(null);
        }
    };

   const onSelectMediaType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMediaState(id, { currMediaType: event.target.value as "image" | "video" | "audio" });
    };

    const renderMediaTypeInput = () => {
        if (!currMediaType) return null;

        const mediaConfig: Record<
            "image" | "video" | "audio",
            { accept: string }
        > = {
            image: { accept: "image/*" },
            video: { accept: "video/*" },
            audio: { accept: "audio/*" },
        };

        const { accept } = mediaConfig[currMediaType];

        return (
            <div className="upload-input-wrapper">
                <input
                    type="file"
                    accept={accept}
                    onChange={(event) => handleMediaUpload(event, currMediaType)}
                    id={`${id}-${currMediaType}Upload`}
                    disabled={isUploading}
                />
                <label htmlFor={`${id}-${currMediaType}Upload`}>
                    {isUploading ? `Uploading... ${uploadProgress.toFixed(1)}%` : `Upload ${currMediaType.charAt(0).toUpperCase() + currMediaType.slice(1)}`}
                </label>
            </div>
        );
    };

    // Update loadExistingMedia to clear existing media first
    const loadExistingMedia = async () => {
        if (!currMediaType || !id || !user?.name) return;
        
        try {
            // Clear existing media state first
            setMediaState(id, { [`${mediaTypeToSrcKey[currMediaType]}`]: null });
            
            const mediaFolder = `${user.name}/media/${currMediaType}s/${id}`;
            console.log('Loading media from:', mediaFolder);
            
            const listRef = firebase.storageRef(firebase.storage, mediaFolder);
            const result = await firebase.listAll(listRef);
            
            if (result.items.length > 0) {
                const downloadURL = await firebase.getDownloadURL(result.items[0]);
                console.log('Found media for user:', { user: user.name, type: currMediaType });
                setMediaState(id, { [`${mediaTypeToSrcKey[currMediaType]}`]: downloadURL });
            }
        } catch (error) {
            console.error("Error loading media:", error);
        }
    };

    return (
        <>
            <section className="media-component-container">
                {/* Button to open modal for selecting media type */}
                {mediaType === "choose" && isEditMode && (
                    <div className="media-choose-wrapper">
                        <AppButton text="Choose Media" onClick={() => setIsModalOpen(true)} />
                    </div>
                )}

                <UploadProgress 
                    progress={uploadProgress}
                    isUploading={isUploading}
                    onCancel={cancelUpload}
                    error={uploadError}
                />

                {/* Render uploaded image */}
                {currMediaType === "image" && (
                    <div className="media-image-wrapper">
                        {isEditMode && mediaType !== "choose" && (
                            <div className="upload-img-input-wrapper">
                                <input
                                    type="file"
                                    id={`${id}-photoUpload`}
                                    accept="image/*"
                                    onChange={(ev) => handleMediaUpload(ev, "image")}
                                />
                                <label htmlFor={`${id}-photoUpload`}>Upload Photo</label>
                            </div>
                        )}
                        {photoSrc ? (
                            <div
                                className="uploaded-img-container"
                                style={{ backgroundImage: `url(${photoSrc})` }}
                            />
                        ) : (
                            isEditMode && <p>No photo uploaded yet.</p>
                        )}
                    </div>
                )}

                {/* Render uploaded video */}
                {currMediaType === "video" && (
                    <div className="media-video-wrapper">
                        {isEditMode && mediaType !== "choose" && (
                            <div className="upload-video-input-wrapper">
                                <input
                                    type="file"
                                    id={`${id}-videoUpload`}
                                    accept="video/*"
                                    onChange={(ev) => handleMediaUpload(ev, "video")}
                                />
                                <label htmlFor={`${id}-videoUpload`}>Upload Video</label>
                            </div>
                        )}
                        {videoSrc ? (
                            <video
                                className="uploaded-video-container"
                                controls
                                src={videoSrc}
                                autoPlay
                                loop
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            isEditMode && <p>No video uploaded yet.</p>
                        )}
                    </div>
                )}

                {/* Render uploaded audio */}
                {currMediaType === "audio" && (
                    <div className="media-audio-wrapper">
                        {isEditMode && mediaType !== "choose" && (
                            <div className={`upload-audio-input-wrapper ${isHeaderAudio ? 'header-audio' : ''}`}>
                                <input
                                    type="file"
                                    id={`${id}-audioUpload`}
                                    accept="audio/*"
                                    onChange={(ev) => handleMediaUpload(ev, "audio")}
                                />
                                <label htmlFor={`${id}-audioUpload`}>Upload Audio</label>
                            </div>
                        )}
                        {audioSrc ? (
                            <audio
                                className="uploaded-audio-container"
                                controls
                                src={audioSrc}
                                autoPlay
                                loop
                            >
                                Your browser does not support the audio element.
                            </audio>
                        ) : (
                            isEditMode && <p>No audio uploaded yet.</p>
                        )}
                    </div>
                )}
            </section>

            {/* Modal for selecting media type */}
            {isModalOpen && (
                <AppDialog title="Choose Media Type" onClose={() => setIsModalOpen(false)}>
                    <div className="dialog-main-content">
                        <select name="media-select" onChange={onSelectMediaType}>
                            <option value="">Choose media type</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>
                        {renderMediaTypeInput()}
                    </div>
                </AppDialog>
            )}
        </>
    );
};