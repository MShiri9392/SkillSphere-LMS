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
            const res = await getCourse(id);
            setCourse(res.data);
        } catch (error) {
            console.error(error);
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

                <div className="card-header bg-primary text-white">
                    <h3>Edit Course</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            name="title"
                            value={course.title}
                            onChange={handleChange}
                            placeholder="Course Title"
                            required
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="4"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                        />

                        <input
                            className="form-control mb-3"
                            name="instructor"
                            value={course.instructor}
                            onChange={handleChange}
                            placeholder="Instructor"
                            required
                        />

                        <input
                            className="form-control mb-3"
                            name="category"
                            value={course.category}
                            onChange={handleChange}
                            placeholder="Category"
                            required
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            name="price"
                            value={course.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />

                        <input
                            className="form-control mb-3"
                            name="imageUrl"
                            value={course.imageUrl}
                            onChange={handleChange}
                            placeholder="Image URL"
                        />

                        <input
                            className="form-control mb-3"
                            name="videoUrl"
                            value={course.videoUrl}
                            onChange={handleChange}
                            placeholder="Video URL"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
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