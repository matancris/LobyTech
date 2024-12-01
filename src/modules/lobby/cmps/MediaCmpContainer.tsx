import { useState } from "react";
import { useStore } from "../../../store/useStore";

interface Props {
    mediaType: "image" | "video" | "audio";
}
export const MediaCmpContainer = ({ mediaType }: Props) => {
    const isEditMode = useStore((state) => state.isEditMode);

    // State to store the uploaded media's data URL
    const [photoSrc, setPhotoSrc] = useState<string | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoSrc(reader.result as string); // Set the photo's data URL
            };
            reader.readAsDataURL(file); // Convert the file to a base64 string
        }
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
            const videoUrl = URL.createObjectURL(file); // Create a temporary URL for the video
            setVideoSrc(videoUrl); // Set the video's source
        }
    };

    return (
        <>
            <section className="media-component-container">
                {/* Image media type */}
                {mediaType === "image" && (
                    <div className="media-image-wrapper">
                        {isEditMode && (
                            <div className="upload-img-input-wrapper">
                                <input
                                    type="file"
                                    id="photoUpload"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                />
                                <label htmlFor="photoUpload">Upload Photo</label>
                            </div>
                        )}

                        {/* Display the uploaded photo or a placeholder */}
                        {photoSrc ? (
                            <div
                                className="uploaded-img-container"
                                style={{ backgroundImage: `url(${photoSrc})` }}
                            />
                        ) : (
                            <p>No photo uploaded yet.</p>
                        )}
                    </div>
                )}

                {/* Video media type */}
                {mediaType === "video" && (
                    <div className="media-video-wrapper">
                        {isEditMode && (
                            <div className="upload-video-input-wrapper">
                                <input
                                    type="file"
                                    id="videoUpload"
                                    accept="video/*"
                                    onChange={handleVideoUpload}
                                />
                                <label htmlFor="videoUpload">Upload Video</label>
                            </div>
                        )}

                        {/* Display the uploaded video or a placeholder */}
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
                            <p>No video uploaded yet.</p>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};
