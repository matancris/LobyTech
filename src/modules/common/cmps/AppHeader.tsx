import { useStore } from "../../../store/useStore";

export const AppHeader = () => {
    const user = useStore(store => store.user)
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
                <nav>
                    <button className="btn-primary" onClick={user ? onLogout : onLogin}>{user ? 'Logout' : "Login"}</button>
                </nav>
            </div>
        </section>
    )
}
