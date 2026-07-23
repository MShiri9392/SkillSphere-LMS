import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteQuiz, getQuizzes } from "../services/QuizService";

function Quiz() {

    const [quizzes, setQuizzes] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        try {
            const response = await getQuizzes();
            setQuizzes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeQuiz = async (id) => {

        if (!window.confirm("Delete this quiz?")) return;

        try {

            await deleteQuiz(id);

            alert("Quiz Deleted!");

            loadQuizzes();

        } catch (error) {

            console.error(error);

        }
    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h2>Quiz Management</h2>

                {(role === "ADMIN" || role === "INSTRUCTOR") && (

                    <Link
                        to="/add-quiz"
                        className="btn btn-success"
                    >
                        ➕ Add Quiz
                    </Link>

                )}

            </div>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Title</th>
                        <th>Question</th>
                        <th>Course ID</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {quizzes.map((quiz) => (

                        <tr key={quiz.id}>

                            <td>{quiz.id}</td>

                            <td>{quiz.title}</td>

                            <td>{quiz.question}</td>

                            <td>{quiz.courseId}</td>

                            <td>

                                <Link
                                    to={`/edit-quiz/${quiz.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeQuiz(quiz.id)}
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

export default Quiz;