import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz, updateQuiz } from "../services/QuizService";

function EditQuiz() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        title: "",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        courseId: ""
    });

    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {

        try {

            const response = await getQuiz(id);

            setQuiz(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to load quiz.");

        }

    };

    const handleChange = (e) => {

        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateQuiz(id, quiz);

            alert("Quiz Updated Successfully!");

            navigate("/quiz");

        } catch (error) {

            console.error(error);

            alert("Failed to Update Quiz");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Edit Quiz</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Quiz Title</label>
                            <input
                                className="form-control"
                                name="title"
                                value={quiz.title}
                                onChange={handleChange}
                                placeholder="Quiz Title"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Question</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                name="question"
                                value={quiz.question}
                                onChange={handleChange}
                                placeholder="Question"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Option A</label>
                            <input
                                className="form-control"
                                name="optionA"
                                value={quiz.optionA}
                                onChange={handleChange}
                                placeholder="Option A"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Option B</label>
                            <input
                                className="form-control"
                                name="optionB"
                                value={quiz.optionB}
                                onChange={handleChange}
                                placeholder="Option B"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Option C</label>
                            <input
                                className="form-control"
                                name="optionC"
                                value={quiz.optionC}
                                onChange={handleChange}
                                placeholder="Option C"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Option D</label>
                            <input
                                className="form-control"
                                name="optionD"
                                value={quiz.optionD}
                                onChange={handleChange}
                                placeholder="Option D"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Correct Answer</label>
                            <input
                                className="form-control"
                                name="correctAnswer"
                                value={quiz.correctAnswer}
                                onChange={handleChange}
                                placeholder="Correct Answer"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Course ID</label>
                            <input
                                className="form-control"
                                type="number"
                                name="courseId"
                                value={quiz.courseId}
                                onChange={handleChange}
                                placeholder="Course ID"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Update Quiz
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/quiz")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default EditQuiz;