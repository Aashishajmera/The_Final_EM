import { Link } from 'react-router-dom'; // Import Link
import Swal from 'sweetalert2'; // Import SweetAlert2
import "./HeaderComponent.css";

export default function HeaderComponent() {

// for showing the username in the nav bar
    const user = sessionStorage.getItem('user');
    const userjsObj = JSON.parse(user);
    const userName = userjsObj.userName;


    // when user click logout button
    const handleLogout = (e) => {
        e.preventDefault(); // Prevent the default behavior of the link

        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the logout action here
                // For example, clearing user data from session storage and redirecting
                sessionStorage.removeItem('userToken'); // Assuming you use sessionStorage
                window.location.href = '/'; // Redirect to home or login page
                Swal.fire(
                    'Logged out!',
                    'You have been logged out successfully.',
                    'success'
                );

                // FOR REMOVE THE DATA IN SESSION STORAGE
                sessionStorage.removeItem('user');
            }
        });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold text-white">Wellcome {userName} !!</Link>
                    <button className="humber-btn navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="fas fa-bars"></i>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-end w-100">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/homePage">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/seeUserFeedback">OurFeedback</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/newEvent">CreateEvent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/ourEvent">OurEvent</Link>
                            </li>
                            <li className="nav-item">
                                <button className="text-white btn btn-danger" href="/" onClick={handleLogout}>LogOut</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}