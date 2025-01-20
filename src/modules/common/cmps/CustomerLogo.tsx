import { useEffect, useState } from 'react';
import { useStore } from '../../../store/useStore';
import { firebase } from '../../../firebase/firebase';

export const CustomerLogo = () => {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const user = useStore(state => state.user);
    const isEditMode = useStore(state => state.isEditMode);

    useEffect(() => {
        loadLogo();
    }, [user?.name]);

    const loadLogo = async () => {
        if (!user?.name) return;
        
        try {
            const logoRef = firebase.storageRef(firebase.storage, `${user.name}/logo/customer-logo`);
            const result = await firebase.listAll(logoRef);
            
            if (result.items.length > 0) {
                const downloadURL = await firebase.getDownloadURL(result.items[0]);
                setLogoUrl(downloadURL);
            }
        } catch (error) {
            console.error("Error loading customer logo:", error);
        }
    };

    const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user?.name) return;

        try {
            // Delete existing logo first
            const logoRef = firebase.storageRef(firebase.storage, `${user.name}/logo/customer-logo`);
            const result = await firebase.listAll(logoRef);
            
            for (const item of result.items) {
                await firebase.deleteObject(item);
            }

            // Upload new logo
            const storageRef = firebase.storageRef(
                firebase.storage,
                `${user.name}/logo/customer-logo/${file.name}`
            );

            await firebase.uploadBytes(storageRef, file);
            const downloadURL = await firebase.getDownloadURL(storageRef);
            setLogoUrl(downloadURL);
        } catch (error) {
            console.error("Error uploading logo:", error);
        }
    };

    return (
        <div className="customer-logo">
            {isEditMode && (
                <div className="upload-logo-wrapper">
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">Upload Logo</label>
                </div>
            )}
            {logoUrl && <img src={logoUrl} alt="Customer Logo" />}
        </div>
    );
}; 