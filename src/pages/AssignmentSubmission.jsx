import { useEffect, useState } from "react";
import {
    getAllSubmissions,
    submitAssignment,
    gradeSubmission,
    deleteSubmission
} from "../services/AssignmentSubmissionService";

function AssignmentSubmission() {

    const [submissions, setSubmissions] = useState([]);

    const [assignmentId, setAssignmentId] = useState("");
    const [userId, setUserId] = useState("");

    const [content, setContent] = useState("");

    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = async () => {
        try {
            const response = await getAllSubmissions();
            setSubmissions(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load submissions");
        }
    };

    const handleSubmitAssignment = async () => {

        if (!assignmentId || !userId || !content) {
            alert("Please fill all fields");
            return;
        }

        try {

            await submitAssignment(
                assignmentId,
                userId,
                {
                    submissionText: content
                }
            );

            alert("Assignment Submitted Successfully");

            setAssignmentId("");
            setUserId("");
            setContent("");

            loadSubmissions();

        } catch (error) {

            console.error(error);
            alert("Submission Failed");

        }

    };

    const handleGrade = async (id) => {

        if (!grade || !feedback) {
            alert("Enter grade and feedback");
            return;
        }

        try {

            await gradeSubmission(id, grade, feedback);

            alert("Submission Graded Successfully");

            setGrade("");
            setFeedback("");

            loadSubmissions();

        } catch (error) {

            console.error(error);
            alert("Grading Failed");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this submission?"))
            return;

        try {

            await deleteSubmission(id);

            alert("Submission Deleted Successfully");

            loadSubmissions();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">
                📤 Assignment Submission
            </h2>

            <div className="card shadow p-4 mb-4">

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Assignment ID"
                    value={assignmentId}
                    onChange={(e) => setAssignmentId(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <textarea
                    rows="5"
                    className="form-control mb-3"
                    placeholder="Submission Text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button
                    className="btn btn-success w-100"
                    onClick={handleSubmitAssignment}
                >
                    Submit Assignment
                </button>

            </div>

            {submissions.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No Submissions Available
                </div>

            ) : (

                <div className="row">

                    {submissions.map((submission) => (

                        <div
                            className="col-md-6 mb-4"
                            key={submission.id}
                        >

                            <div className="card shadow">

                                <div className="card-body">

                                    <h5 className="text-primary">
                                        Submission #{submission.id}
                                    </h5>

                                    <hr />

                                    <p>
                                        <strong>Submission:</strong><br />
                                        {submission.submissionText}
                                    </p>

                                    <p>
                                        <strong>User ID:</strong>{" "}
                                        {submission.user?.id}
                                    </p>

                                    <p>
                                        <strong>User Name:</strong>{" "}
                                        {submission.user?.name}
                                    </p>

                                    <p>
                                        <strong>Assignment ID:</strong>{" "}
                                        {submission.assignment?.id}
                                    </p>

                                    <p>
                                        <strong>Assignment:</strong>{" "}
                                        {submission.assignment?.title}
                                    </p>

                                    <p>
                                        <strong>Submitted At:</strong>{" "}
                                        {submission.submittedAt
                                            ? new Date(
                                                submission.submittedAt
                                            ).toLocaleString()
                                            : "-"}
                                    </p>

                                    <p>
                                        <strong>Grade:</strong>{" "}
                                        {submission.grade ?? "Not Graded"}
                                    </p>

                                    <p>
                                        <strong>Feedback:</strong>{" "}
                                        {submission.feedback ?? "-"}
                                    </p>

                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        placeholder="Grade"
                                        value={grade}
                                        onChange={(e) =>
                                            setGrade(e.target.value)
                                        }
                                    />

                                    <textarea
                                        rows="2"
                                        className="form-control mb-2"
                                        placeholder="Feedback"
                                        value={feedback}
                                        onChange={(e) =>
                                            setFeedback(e.target.value)
                                        }
                                    />

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() =>
                                            handleGrade(submission.id)
                                        }
                                    >
                                        Grade
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDelete(submission.id)
                                        }
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

export default AssignmentSubmission;