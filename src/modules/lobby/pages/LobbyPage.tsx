import { useStore } from "../../../store/useStore";
import { AppLayout } from "../../common/cmps/AppLayout";
import { LobbyAdList } from "../cmps/LobbyAdList";
import { useEffect, useState } from "react";
import { ManagerMsgsContainer } from "../cmps/ManagerMsgsContainer";

export const LobbyPage = () => {
  const managerMsgs = useStore((state) => state.managerMsgs);
  const getManagerMsgs = useStore((state) => state.getManagerMsgs);
  const isEditMode = useStore((state) => state.isEditMode)

  // State to store the uploaded photo's data URL
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  // Handle file upload
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

  useEffect(() => {
    getManagerMsgs(); // Fetch manager messages on mount
  }, [getManagerMsgs]);

  return (
    <section className="lobby-page">
      <AppLayout layout="default">
        <LobbyAdList />
        <ManagerMsgsContainer managerMsgs={managerMsgs} />
        <div className="media-component-container">
          {/* Photo upload functionality */}
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
        </div>
      </AppLayout>
    </section>
  );
};
