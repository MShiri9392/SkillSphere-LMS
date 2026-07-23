import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../services/CourseService";

function AddCourse() {

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

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addCourse(course);

            alert("Course Added Successfully!");

            navigate("/courses");

        } catch (error) {
            console.error(error);
            alert("Failed to add course.");
        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Add Course</h3>
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
                                value={course.imageUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Video URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="videoUrl"
                                value={course.videoUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn btn-success me-2"
                            type="submit"
                        >
                            Save Course
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

export default AddCourse;