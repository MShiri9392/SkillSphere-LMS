import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getSubmissions,
    deleteSubmission
} from "../services/SubmissionService";

function Submissions() {

    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadSubmissions();
    }, []);

    useEffect(() => {

        const filtered = submissions.filter((submission) => {

            const student = submission.user?.name?.toLowerCase() || "";
            const assignment = submission.assignment?.title?.toLowerCase() || "";

            return (
                student.includes(search.toLowerCase()) ||
                assignment.includes(search.toLowerCase())
            );

        });

        setFilteredSubmissions(filtered);

    }, [search, submissions]);

    const loadSubmissions = async () => {

        try {

            setLoading(true);

            const res = await getSubmissions();

            setSubmissions(res.data);

            setFilteredSubmissions(res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const removeSubmission = async (id) => {

        if (!window.confirm("Delete this submission?"))
            return;

        try {

            await deleteSubmission(id);

            loadSubmissions();

        } catch (err) {

            console.error(err);

            alert("Unable to delete submission.");

        }

    };

    if (loading) {

        return (

            <div className="text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <p className="mt-3">Loading submissions...</p>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                    <div>

                        <h3 className="mb-0">Assignment Submissions</h3>

                        <small>

                            Total Submissions : {filteredSubmissions.length}

                        </small>

                    </div>

                </div>

                <div className="card-body">

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="🔍 Search by student or assignment..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {filteredSubmissions.length === 0 ? (

                        <div className="alert alert-info">

                            No submissions found.

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover table-bordered align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Student</th>

                                        <th>Assignment</th>

                                        <th>Submission</th>

                                        <th>Submitted At</th>

                                        <th>Grade</th>

                                        <th>Feedback</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredSubmissions.map((submission) => (

                                        <tr key={submission.id}>

                                            <td>{submission.id}</td>

                                            <td>{submission.user?.name}</td>

                                            <td>{submission.assignment?.title}</td>

                                            <td style={{ maxWidth: "250px" }}>

                                                {submission.submissionText}

                                            </td>

                                            <td>

                                                {submission.submittedAt
                                                    ? new Date(submission.submittedAt).toLocaleString()
                                                    : "-"}

                                            </td>

                                            <td>

                                                {submission.grade ?? "Not Graded"}

                                            </td>

                                            <td>

                                                {submission.feedback || "-"}

                                            </td>

                                            <td>

                                                {(role === "ADMIN" || role === "INSTRUCTOR") && (

                                                    <Link
                                                        to={`/grade-submission/${submission.id}`}
                                                        className="btn btn-warning btn-sm me-2"
                                                    >
                                                        Grade
                                                    </Link>

                                                )}

                                                {(role === "ADMIN" || role === "INSTRUCTOR") && (

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeSubmission(submission.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Submissions;