import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const menuStyle = ({ isActive }) =>
        isActive
            ? "nav-link text-warning fw-bold rounded bg-secondary px-3 py-2"
            : "nav-link text-white px-3 py-2";

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div
            className="bg-dark text-white shadow"
            style={{
                width: "280px",
                minHeight: "100vh",
                overflowY: "auto"
            }}
        >
            {/* Logo */}

            <div className="text-center p-3 border-bottom">
                <h3>🎓 SkillSphere</h3>

                <small className="text-info">
                    {role}
                </small>
            </div>

            <ul className="nav flex-column p-2">

                {/* Dashboard */}

                <li className="nav-item">
                    <NavLink to="/dashboard" className={menuStyle}>
                        🏠 Dashboard
                    </NavLink>
                </li>

                {/* ================= ADMIN ================= */}

                {role === "ADMIN" && (
                    <>
                        <hr className="text-secondary"/>

                        <h6 className="text-warning px-3">
                            Administration
                        </h6>

                        <li className="nav-item">
                            <NavLink to="/analytics" className={menuStyle}>
                                📊 Analytics
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/users" className={menuStyle}>
                                👥 Users
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/payments" className={menuStyle}>
                                💳 Payments
                            </NavLink>
                        </li>
                    </>
                )}

                {/* ================= COURSES ================= */}

                {(role === "ADMIN" || role === "INSTRUCTOR") && (
                    <>
                        <hr className="text-secondary"/>

                        <h6 className="text-warning px-3">
                            Course Management
                        </h6>

                        <li className="nav-item">
                            <NavLink to="/courses" className={menuStyle}>
                                📚 Courses
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/add-course" className={menuStyle}>
                                ➕ Add Course
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/assignment" className={menuStyle}>
                                📄 Assignments
                            </NavLink>
                        </li>
                    </>
                )}

                {/* ================= LEARNING ================= */}

                <hr className="text-secondary"/>

                <h6 className="text-warning px-3">
                    Learning
                </h6>

                <li className="nav-item">
                    <NavLink to="/enrollments" className={menuStyle}>
                        🎓 My Enrollments
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/quiz" className={menuStyle}>
                        📝 Quiz
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/quiz-attempt" className={menuStyle}>
                        📋 Quiz Attempts
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/progress" className={menuStyle}>
                        📈 Progress
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/reviews" className={menuStyle}>
                        ⭐ Course Reviews
                    </NavLink>
                </li>

                {role === "STUDENT" && (
                    <>
                        <li className="nav-item">
                            <NavLink to="/wishlist" className={menuStyle}>
                                ❤️ Wishlist
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/certificate" className={menuStyle}>
                                🏆 Certificates
                            </NavLink>
                        </li>
                    </>
                )}

                {/* ================= COMMUNICATION ================= */}

                <hr className="text-secondary"/>

                <h6 className="text-warning px-3">
                    Communication
                </h6>

                <li className="nav-item">
                    <NavLink to="/announcements" className={menuStyle}>
                        📢 Announcements
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/notifications" className={menuStyle}>
                        🔔 Notifications
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/discussions" className={menuStyle}>
                        💬 Discussions
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/submission" className={menuStyle}>
                        📤 Assignment Submission
                    </NavLink>
                </li>

                {/* ================= ACCOUNT ================= */}

                <hr className="text-secondary"/>

                <h6 className="text-warning px-3">
                    Account
                </h6>

                <li className="nav-item">
                    <NavLink to="/profile" className={menuStyle}>
                        👤 Profile
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/change-password" className={menuStyle}>
                        🔒 Change Password
                    </NavLink>
                </li>

                <li className="nav-item mt-3 px-2">
                    <button
                        className="btn btn-danger w-100"
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>
                </li>

            </ul>

            <div
                className="text-center text-secondary py-3 border-top"
                style={{ fontSize: "12px" }}
            >
                © 2026 SkillSphere LMS
            </div>

        </div>
    );
}

export default Sidebar;