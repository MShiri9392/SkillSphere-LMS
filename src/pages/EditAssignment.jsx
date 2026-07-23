import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAssignment,
    updateAssignment
} from "../services/AssignmentService";

function EditAssignment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
        courseId: ""
    });

    useEffect(() => {
        loadAssignment();
    }, []);

    const loadAssignment = async () => {

        try {

            const response = await getAssignment(id);

            setAssignment(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load assignment.");

        }

    };

    const handleChange = (e) => {

        setAssignment({
            ...assignment,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateAssignment(id, assignment);

            alert("Assignment Updated Successfully!");

            navigate("/assignment");

        } catch (error) {

            console.error(error);

            alert("Failed to update assignment.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3>Edit Assignment</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Assignment Title
                            </label>

                            <input
                                className="form-control"
                                name="title"
                                value={assignment.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="description"
                                value={assignment.description}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Due Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="dueDate"
                                value={assignment.dueDate}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Course ID
                            </label>

                            <input
                                type="number"
                                className="form-control"
                                name="courseId"
                                value={assignment.courseId}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-warning me-2"
                            type="submit"
                        >
                            Update Assignment
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/assignment")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default EditAssignment;