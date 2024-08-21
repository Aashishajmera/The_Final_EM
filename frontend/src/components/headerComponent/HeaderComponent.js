import "./HeaderComponent.css"

export default function HeaderComponent() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-white" href="#">Logo</a>
                    <button className="humber-btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="humber-icon navbar-toggler-icon border-0"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-end w-100">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">CreateEvent</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">OurEvent</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">LogOut</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}