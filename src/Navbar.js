

function Navbar() {
    return (
        <nav className="nav-bar">
            <div className="nav-links">
                <a className="nav-link" href="">Home</a>
                <div className="divider"></div>
                <a className="nav-link current-page">My Albums</a>
                <div className="divider"></div>
                <a className="nav-link" href="">About This Site</a>
            </div>
        </nav>
    );
}

export default Navbar