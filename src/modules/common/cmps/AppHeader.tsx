import { MediaCmpContainer } from "@/modules/lobby/cmps/MediaCmpContainer";
import { useStore } from "../../../store/useStore";

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
                <h1>LobbyTech</h1>
                <MediaCmpContainer mediaType="audio" id="background-audio" isHeaderAudio/>
                <nav>
                    <button className="btn-primary" onClick={manager ? onLogout : onLogin}>{manager ? 'Logout' : "Login"}</button>
                </nav>
            </div>
        </section>
    )
}
