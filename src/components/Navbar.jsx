import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

            <div className="container-fluid">

                <h4 className="mb-0 fw-bold">
                    🎓 SkillSphere LMS
                </h4>

                <div className="d-flex align-items-center">

                    <button
                        className="btn btn-outline-secondary me-3"
                    >
                        🔔
                    </button>

                    <div className="dropdown">

                        <button
                            className="btn btn-outline-primary dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            👤 My Account
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">

                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => navigate("/profile")}
                                >
                                    Profile
                                </button>
                            </li>

                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => navigate("/change-password")}
                                >
                                    Change Password
                                </button>
                            </li>

                            <li>
                                <hr className="dropdown-divider" />
                            </li>

                            <li>
                                <button
                                    className="dropdown-item text-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;