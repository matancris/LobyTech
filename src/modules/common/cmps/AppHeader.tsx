import { MediaCmpContainer } from "@/modules/lobby/cmps/MediaCmpContainer";
import { useStore } from "../../../store/useStore";
import { AppLogo } from "./AppLogo";
import { AppButton } from "./AppButton";

export const AppHeader = () => {
    const manager = useStore(store => store.manager)
    const authenticateUser = useStore((state) => state.authenticateUser)
    const logout = useStore((state) => state.logout)

    const onLogin = () => {
        // TODO: Implement login logic
        console.log('Login clicked')
        authenticateUser()
    }

    const onLogout = () => {
        // TODO: Implement login logic
        console.log('Logout clicked')
        logout()
    }

    return (
        <section className="app-header">
            <div className="header-wrapper flex space-between align-center">
                <AppLogo />
                <MediaCmpContainer mediaType="audio" id="background-audio" isHeaderAudio />
                <nav>
                    <AppButton text={`${manager ? 'Logout' : "Login"}`} type="secondary" onClick={manager ? onLogout : onLogin}/>
                </nav>
            </div>
        </section>
    )
}
