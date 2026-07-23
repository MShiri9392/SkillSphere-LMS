import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews, deleteReview } from "../services/ReviewService";

function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const res = await getReviews();
            setReviews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this review?")) {
            await deleteReview(id);
            loadReviews();
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">
                <h2>Course Reviews</h2>

                <Link
                    to="/add-review"
                    className="btn btn-primary"
                >
                    Add Review
                </Link>
            </div>

            <table className="table table-bordered">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Course</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Review</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {reviews.map((review) => (

                        <tr key={review.id}>

                            <td>{review.id}</td>
                            <td>{review.course?.title}</td>
                            <td>{review.user?.name}</td>
                            <td>{review.rating}</td>
                            <td>{review.review}</td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(review.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Reviews;