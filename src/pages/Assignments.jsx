import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAssignments,
    deleteAssignment
} from "../services/AssignmentService";

function Assignments() {

    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {

        try {

            setLoading(true);

            const response = await getAssignments();

            setAssignments(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load assignments.");

        } finally {

            setLoading(false);

        }
    };

    const removeAssignment = async (id) => {

        if (!window.confirm("Are you sure you want to delete this assignment?"))
            return;

        try {

            await deleteAssignment(id);

            alert("Assignment deleted successfully.");

            loadAssignments();

        } catch (error) {

            console.error(error);

            alert("Unable to delete assignment.");

        }
    };

    const filteredAssignments = assignments.filter((assignment) =>

        assignment.title.toLowerCase().includes(search.toLowerCase()) ||

        assignment.description.toLowerCase().includes(search.toLowerCase()) ||

        assignment.courseId.toString().includes(search)

    );

    if (loading) {

        return (

            <div className="container text-center mt-5">

                <div className="spinner-border text-primary"></div>

                <h4 className="mt-3">Loading Assignments...</h4>

            </div>

        );

    }

    return (

        <div className="container-fluid mt-4">

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                    <div>

                        <h3 className="mb-0">
                            📄 Assignment Management
                        </h3>

                        <small>
                            Total Assignments : {filteredAssignments.length}
                        </small>

                    </div>

                    {(role === "ADMIN" || role === "INSTRUCTOR") && (

                        <Link
                            to="/add-assignment"
                            className="btn btn-light"
                        >
                            ➕ Add Assignment
                        </Link>

                    )}

                </div>

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search by title, description or course ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover table-bordered align-middle">

                            <thead className="table-dark text-center">

                                <tr>

                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Due Date</th>
                                    <th>Course ID</th>
                                    <th width="250">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAssignments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center text-danger"
                                        >

                                            No Assignments Found

                                        </td>

                                    </tr>

                                ) : (

                                    filteredAssignments.map((assignment) => (

                                        <tr key={assignment.id}>

                                            <td className="text-center">
                                                {assignment.id}
                                            </td>

                                            <td>
                                                <strong>
                                                    {assignment.title}
                                                </strong>
                                            </td>

                                            <td>{assignment.description}</td>

                                            <td>
                                                <span className="badge bg-warning text-dark">
                                                    {assignment.dueDate}
                                                </span>
                                            </td>

                                            <td className="text-center">
                                                {assignment.courseId}
                                            </td>

                                            <td>

                                                <Link
                                                    to={`/assignment/${assignment.id}`}
                                                    className="btn btn-info btn-sm me-2"
                                                >
                                                    👁 View
                                                </Link>

                                                {(role === "ADMIN" || role === "INSTRUCTOR") && (
                                                    <>
                                                        <Link
                                                            to={`/edit-assignment/${assignment.id}`}
                                                            className="btn btn-warning btn-sm me-2"
                                                        >
                                                            ✏ Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                removeAssignment(
                                                                    assignment.id
                                                                )
                                                            }
                                                        >
                                                            🗑 Delete
                                                        </button>
                                                    </>
                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Assignments;