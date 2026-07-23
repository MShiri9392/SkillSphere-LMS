import { useEffect, useState } from "react";
import { deleteEnrollment, getUserEnrollments } from "../services/EnrollmentService";

function Enrollments() {

    const [enrollments, setEnrollments] = useState([]);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        loadEnrollments();
    }, []);

    const loadEnrollments = async () => {
        try {
            const response = await getUserEnrollments(userId);
            setEnrollments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeEnrollment = async (id) => {

        if (!window.confirm("Remove enrollment?")) return;

        try {

            await deleteEnrollment(id);

            alert("Enrollment Removed!");

            loadEnrollments();

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                🎓 My Enrollments
            </h2>

            <table className="table table-bordered">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>User ID</th>
                    <th>Course ID</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {enrollments.length === 0 ? (

                    <tr>
                        <td colSpan="5" className="text-center">
                            No Enrollments Found
                        </td>
                    </tr>

                ) : (

                    enrollments.map((enrollment) => (

                        <tr key={enrollment.id}>

                            <td>{enrollment.id}</td>
                            <td>{enrollment.userId}</td>
                            <td>{enrollment.courseId}</td>
                            <td>{enrollment.status}</td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeEnrollment(enrollment.id)}
                                >
                                    Remove
                                </button>

                            </td>

                        </tr>

                    ))

                )}

                </tbody>

            </table>

        </div>
    );
}

export default Enrollments;