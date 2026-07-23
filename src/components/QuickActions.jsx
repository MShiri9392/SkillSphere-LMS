import { Link } from "react-router-dom";

function QuickActions() {

    const role = localStorage.getItem("role");

    return (
        <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">⚡ Quick Actions</h5>
            </div>

            <div className="card-body">

                <div className="d-grid gap-3">

                    {(role === "ADMIN" || role === "INSTRUCTOR") && (
                        <>
                            <Link
                                to="/add-course"
                                className="btn btn-success"
                            >
                                ➕ Add Course
                            </Link>

                            <Link
                                to="/courses"
                                className="btn btn-primary"
                            >
                                📚 Manage Courses
                            </Link>

                            <Link
                                to="/add-quiz"
                                className="btn btn-warning"
                            >
                                📝 Add Quiz
                            </Link>

                            <Link
                                to="/users"
                                className="btn btn-info"
                            >
                                👥 Manage Users
                            </Link>

                            <Link
                                to="/payments"
                                className="btn btn-dark"
                            >
                                💳 Payments
                            </Link>
                        </>
                    )}

                    {role === "STUDENT" && (
                        <>
                            <Link
                                to="/courses"
                                className="btn btn-success"
                            >
                                📚 Browse Courses
                            </Link>

                            <Link
                                to="/enrollments"
                                className="btn btn-primary"
                            >
                                🎓 My Courses
                            </Link>

                            <Link
                                to="/quiz"
                                className="btn btn-warning"
                            >
                                📝 Take Quiz
                            </Link>

                            <Link
                                to="/certificate"
                                className="btn btn-info"
                            >
                                🏆 Certificates
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default QuickActions;