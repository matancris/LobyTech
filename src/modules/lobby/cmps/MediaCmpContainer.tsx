import { useState } from "react";
import { useStore } from "../../../store/useStore";

interface Props {
    mediaType: "image" | "video" | "audio";
}
export const MediaCmpContainer = ({ mediaType }: Props) => {
    const isEditMode = useStore((state) => state.isEditMode)

    // State to store the uploaded photo's data URL
    const [photoSrc, setPhotoSrc] = useState<string | null>(null);

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


    return (
        <>
            <section className="media-component-container">
                {/* Image media type */}
                {mediaType === "image" &&
                    <div className="media-image-wrapper">
                        {isEditMode && <div className="upload-img-input-wrapper">
                            <input
                                type="file"
                                id="photoUpload"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                            <label htmlFor="photoUpload">Upload Photo</label>
                        </div>}

                        {/* Display the uploaded photo or a placeholder */}
                        {photoSrc ? (
                            <div className="uploaded-img-container" style={{ backgroundImage: `url(${photoSrc})` }} />
                        ) : (
                            <p>No photo uploaded yet.</p>
                        )}

                    </div>}
                <div></div>
            </section>
        </>
    )
}
