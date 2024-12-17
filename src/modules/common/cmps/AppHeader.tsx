import { MediaCmpContainer } from "@/modules/lobby/cmps/MediaCmpContainer";
import { useStore } from "../../../store/useStore";
import { AppLogo } from "./AppLogo";
import { AppButton } from "./AppButton";


interface Props {
    onLogin: () => void;
    onLogout: () => void;
}

export const AppHeader = ({ onLogin, onLogout }: Props) => {
    const user = useStore(store => store.user)
    const isEditMode = useStore((state) => state.isEditMode);
    const setEditMode = useStore((state) => state.setEditMode);


    return (
        <section className="app-header">
            <div className="header-wrapper flex space-between align-center">
                <AppLogo />
                <MediaCmpContainer mediaType="audio" id="background-audio" isHeaderAudio />
                <div className="actions-container flex gap-8">
                    <AppButton text={`${user ? 'Logout' : "Login"}`} type="secondary" onClick={user ? onLogout : onLogin} />
                    {user &&
                        <AppButton
                            text={`${isEditMode ? 'Close edit' : "Edit"}`}
                            type="secondary"
                            onClick={isEditMode ? () => setEditMode(false) : () => setEditMode(true)} />
                    }
                </div>
            </div>
        </section>
    )
}
