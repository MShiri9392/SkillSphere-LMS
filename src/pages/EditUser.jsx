import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../services/CourseService";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        description: "",
        instructor: "",
        category: "",
        price: "",
        imageUrl: "",
        videoUrl: ""
    });

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {
        try {
            const response = await getCourse(id);
            setCourse(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load course.");
        }
    };

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await updateCourse(id, course);

            alert("Course Updated Successfully!");

            navigate("/courses");

        } catch (error) {
            console.error(error);
            alert("Failed to update course.");
        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">
                    <h3>Edit Course</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Course Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={course.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={course.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Instructor</label>
                            <input
                                type="text"
                                className="form-control"
                                name="instructor"
                                value={course.instructor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                name="category"
                                value={course.category}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={course.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageUrl"
                                value={course.imageUrl || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Video URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="videoUrl"
                                value={course.videoUrl || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn btn-primary me-2">
                            Update Course
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/courses")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditCourse;