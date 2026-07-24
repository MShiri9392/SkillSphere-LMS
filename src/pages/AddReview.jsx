import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReview } from "../services/ReviewService";

function AddReview() {

    const navigate = useNavigate();

    const [courseId, setCourseId] = useState("");
    const userId = localStorage.getItem("userId");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addReview(courseId, userId, {
                rating: parseInt(rating),
                review
            });

            alert("Review Added Successfully");
            navigate("/reviews");

        } catch (err) {
            console.error(err);
            alert("Failed to add review");
        }
    };

    return (
        <div className="container mt-4">

            <h2>Add Course Review</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Course ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        required
                    />
                </div>



                <div className="mb-3">
                    <label>Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Review</label>
                    <textarea
                        rows="4"
                        className="form-control"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-success">
                    Submit Review
                </button>

            </form>

        </div>
    );
}

export default AddReview;