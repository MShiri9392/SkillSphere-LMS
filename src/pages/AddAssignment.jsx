import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAssignment } from "../services/AssignmentService";

function AddAssignment() {

    const navigate = useNavigate();

    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
        courseId: ""
    });

    const handleChange = (e) => {
        setAssignment({
            ...assignment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addAssignment(assignment);

            alert("Assignment Added Successfully!");

            navigate("/assignment");

        } catch (error) {

            console.error(error);

            alert("Failed to add assignment.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Add Assignment</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            className="form-control mb-3"
                            placeholder="Description"
                            name="description"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="date"
                            className="form-control mb-3"
                            name="dueDate"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            className="form-control mb-3"
                            placeholder="Course ID"
                            name="courseId"
                            onChange={handleChange}
                            required
                        />

                        <button className="btn btn-success">
                            Save Assignment
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default AddAssignment;