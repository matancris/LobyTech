
export const AppHeader = () => {
    return (
        <section className="app-header">
            <div className="header-wrapper flex space-between">
                <h1>LobbyTech</h1>
                <nav>
                    <ul className="nav-links flex ">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                        <button className="btn-primary">Login</button>
                    </ul>
                </nav>
            </div>
        </section>
    )
}
