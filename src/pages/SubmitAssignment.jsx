import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitAssignment } from "../services/SubmissionService";

function SubmitAssignment() {

    const { assignmentId } = useParams();

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const [submissionText, setSubmissionText] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await submitAssignment(
                assignmentId,
                userId,
                {
                    submissionText
                }
            );

            alert("Assignment Submitted Successfully");

            navigate("/submissions");

        } catch (error) {

            console.error(error);

            alert("Submission Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Submit Assignment</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Submission

                            </label>

                            <textarea
                                className="form-control"
                                rows="8"
                                value={submissionText}
                                onChange={(e)=>setSubmissionText(e.target.value)}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-success"
                        >
                            Submit
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default SubmitAssignment;