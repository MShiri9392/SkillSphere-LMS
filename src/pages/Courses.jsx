import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getCourses,
    deleteCourse
} from "../services/CourseService";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);

            const response = await getCourses();

            setCourses(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to load courses.");

        } finally {

            setLoading(false);

        }
    };

    const removeCourse = async (id) => {

        if (!window.confirm("Delete this course?")) return;

        try {

            await deleteCourse(id);

            alert("Course deleted successfully.");

            loadCourses();

        } catch (error) {

            console.error(error);

            alert("Unable to delete course.");

        }
    };

    const filteredCourses = courses.filter(course =>

        course.title.toLowerCase().includes(search.toLowerCase()) ||

        course.instructor.toLowerCase().includes(search.toLowerCase()) ||

        course.category.toLowerCase().includes(search.toLowerCase())

    );

    if (loading) {

        return (

            <div className="container text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <h4 className="mt-3">
                    Loading Courses...
                </h4>

            </div>

        );

    }

    return (

        <div className="container-fluid mt-4">

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                    <div>

                        <h3 className="mb-0">
                            📚 Course Management
                        </h3>

                        <small>
                            Total Courses : {filteredCourses.length}
                        </small>

                    </div>

                    {(role === "ADMIN" || role === "INSTRUCTOR") && (

                        <Link
                            to="/add-course"
                            className="btn btn-light"
                        >
                            ➕ Add Course
                        </Link>

                    )}

                </div>

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search by title, instructor or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark text-center">

                                <tr>

                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Instructor</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Video</th>
                                    <th width="260">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredCourses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center text-danger"
                                        >

                                            No Courses Found

                                        </td>

                                    </tr>

                                ) : (

                                    filteredCourses.map(course => (

                                        <tr key={course.id}>

                                            <td className="text-center">
                                                {course.id}
                                            </td>

                                            <td className="text-center">

                                                {course.imageUrl ? (

                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        width="90"
                                                        height="60"
                                                        style={{
                                                            objectFit: "cover",
                                                            borderRadius: "8px"
                                                        }}
                                                    />

                                                ) : (

                                                    <span className="text-muted">
                                                        No Image
                                                    </span>

                                                )}

                                            </td>

                                            <td>
                                                <strong>
                                                    {course.title}
                                                </strong>
                                            </td>

                                            <td>{course.instructor}</td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {course.category}

                                                </span>

                                            </td>

                                            <td>

                                                <span className="fw-bold text-danger">

                                                    ₹ {course.price}

                                                </span>

                                            </td>

                                            <td className="text-center">

                                                {course.videoUrl ? (

                                                    <a
                                                        href={course.videoUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        ▶ Watch
                                                    </a>

                                                ) : (

                                                    <span className="text-muted">

                                                        No Video

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <Link
                                                    to={`/course/${course.id}`}
                                                    className="btn btn-info btn-sm me-2"
                                                >
                                                    👁 View
                                                </Link>

                                                {(role === "ADMIN" || role === "INSTRUCTOR") && (
                                                    <>
                                                        <Link
                                                            to={`/edit-course/${course.id}`}
                                                            className="btn btn-warning btn-sm me-2"
                                                        >
                                                            ✏ Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removeCourse(course.id)}
                                                        >
                                                            🗑 Delete
                                                        </button>
                                                    </>
                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Courses;