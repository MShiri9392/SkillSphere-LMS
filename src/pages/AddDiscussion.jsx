import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../services/DiscussionService";

function AddDiscussion() {

    const navigate = useNavigate();

    const [courseId, setCourseId] = useState("");
    const [userId, setUserId] = useState("");
    const [question, setQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createDiscussion(courseId, userId, {
                question,
            });

            alert("Discussion Added Successfully");
            navigate("/discussions");

        } catch (error) {
            console.error(error);
            alert("Failed to Add Discussion");
        }
    };

    return (
        <div className="container mt-4">

            <h2>Add Discussion</h2>

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
                    <label>User ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Question</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-success">
                    Submit Discussion
                </button>

            </form>

        </div>
    );
}

export default AddDiscussion;