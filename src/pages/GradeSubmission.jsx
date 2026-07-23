import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getSubmission,
    gradeSubmission
} from "../services/SubmissionService";

function GradeSubmission() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [submission, setSubmission] = useState(null);

    const [grade, setGrade] = useState("");

    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        loadSubmission();
    }, []);

    const loadSubmission = async () => {
        try {
            const res = await getSubmission(id);
            setSubmission(res.data);

            setGrade(res.data.grade || "");
            setFeedback(res.data.feedback || "");

        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await gradeSubmission(id, grade, feedback);

            alert("Submission graded successfully!");

            navigate("/submissions");

        } catch (err) {

            console.error(err);

            alert("Failed to grade submission.");

        }

    };

    if (!submission)
        return <div className="container mt-5">Loading...</div>;

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3>Grade Assignment</h3>

                </div>

                <div className="card-body">

                    <p><strong>Student:</strong> {submission.user?.name}</p>

                    <p><strong>Assignment:</strong> {submission.assignment?.title}</p>

                    <p><strong>Submission:</strong></p>

                    <div className="border rounded p-3 mb-4 bg-light">
                        {submission.submissionText}
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Grade

                            </label>

                            <input
                                type="number"
                                className="form-control"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Feedback

                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />

                        </div>

                        <button className="btn btn-success">

                            Save Grade

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default GradeSubmission;