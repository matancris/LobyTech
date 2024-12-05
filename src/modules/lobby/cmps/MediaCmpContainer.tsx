import { useEffect, useState } from "react";
import { useStore } from "../../../store/useStore";
import { AppButton } from "../../common/cmps/AppButton";
import { AppDialog } from "../../common/cmps/AppDialog";

interface Props {
    mediaType: "image" | "video" | "audio" | "choose";
    id: string; // Unique identifier for the instance
    isHeaderAudio?: boolean;
}
export const MediaCmpContainer = ({ mediaType, id, isHeaderAudio }: Props) => {
    const isEditMode = useStore((state) => state.isEditMode);
    const mediaState = useStore((state) => state.mediaState);
    const setMediaState = useStore((state) => state.setMediaState);

    const instanceState = mediaState[id] || {
        photoSrc: null,
        videoSrc: null,
        audioSrc: null,
        currMediaType: null,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { photoSrc, videoSrc, audioSrc, currMediaType } = instanceState;


    useEffect(() => {
        if (mediaType === "choose") return;
        setMediaState(id, { currMediaType: mediaType });
    }, [mediaType, id, setMediaState]);


    const handleMediaUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        mediaType: "image" | "video" | "audio",
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (mediaType === "image") {
            const reader = new FileReader();
            reader.onload = () => {
                setMediaState(id, { photoSrc: reader.result as string });
            };
            reader.readAsDataURL(file);
        } else {
            const fileUrl = URL.createObjectURL(file);
            setMediaState(id, mediaType === "video" ? { videoSrc: fileUrl } : { audioSrc: fileUrl });
        }
        setIsModalOpen(false);
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
                />
                <label htmlFor={`${id}-${currMediaType}Upload`}>
                    Upload {currMediaType.charAt(0).toUpperCase() + currMediaType.slice(1)}
                </label>
            </div>
        );
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