import { useEffect, useState } from "react";
import {
    getAllReviews,
    addReview,
    deleteReview
} from "../services/CourseReviewService";

function CourseReview() {

    const [reviews, setReviews] = useState([]);

    const [courseId, setCourseId] = useState("");
    const [userId, setUserId] = useState("");

    const [form, setForm] = useState({
        rating: "",
        review: ""
    });

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const response = await getAllReviews();
            setReviews(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load reviews");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        if (!courseId || !userId || !form.rating || !form.review) {
            alert("Please fill all fields");
            return;
        }

        try {

            await addReview(
                courseId,
                userId,
                {
                    rating: Number(form.rating),
                    review: form.review
                }
            );

            alert("Review Added Successfully");

            setCourseId("");
            setUserId("");

            setForm({
                rating: "",
                review: ""
            });

            loadReviews();

        } catch (error) {

            console.error(error);
            alert("Failed to add review");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this review?"))
            return;

        try {

            await deleteReview(id);

            alert("Review Deleted Successfully");

            loadReviews();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                ⭐ Course Reviews
            </h2>

            <div className="card shadow p-4 mb-4">

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <select
                    className="form-control mb-3"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                >
                    <option value="">Select Rating</option>
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐⭐</option>
                    <option value="3">3 ⭐⭐⭐</option>
                    <option value="4">4 ⭐⭐⭐⭐</option>
                    <option value="5">5 ⭐⭐⭐⭐⭐</option>
                </select>

                <textarea
                    rows="4"
                    className="form-control mb-3"
                    name="review"
                    placeholder="Write Review"
                    value={form.review}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                >
                    Submit Review
                </button>

            </div>

            {reviews.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Reviews Available
                </div>

            ) : (

                <div className="row">

                    {reviews.map((review) => (

                        <div className="col-md-6 mb-4" key={review.id}>

                            <div className="card shadow">

                                <div className="card-body">

                                    <h5 className="text-primary">
                                        Review #{review.id}
                                    </h5>

                                    <hr />

                                    <p>
                                        <strong>Course:</strong>{" "}
                                        {review.course?.title}
                                    </p>

                                    <p>
                                        <strong>User:</strong>{" "}
                                        {review.user?.name}
                                    </p>

                                    <p>
                                        <strong>Rating:</strong>{" "}
                                        {review.rating} ⭐
                                    </p>

                                    <p>
                                        <strong>Review:</strong><br />
                                        {review.review}
                                    </p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(review.id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default CourseReview;