import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../services/QuizService";

function AddQuiz() {

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

    const handleChange = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addQuiz(quiz);

            alert("Quiz Added Successfully!");

            navigate("/quiz");

        } catch (error) {

            console.error(error);

            alert("Failed to add quiz.");

        }
    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Add Quiz</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            placeholder="Quiz Title"
                            name="title"
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            className="form-control mb-3"
                            placeholder="Question"
                            name="question"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Option A"
                            name="optionA"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Option B"
                            name="optionB"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Option C"
                            name="optionC"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Option D"
                            name="optionD"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Correct Answer"
                            name="correctAnswer"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Course ID"
                            name="courseId"
                            type="number"
                            onChange={handleChange}
                            required
                        />

                        <button className="btn btn-success">
                            Save Quiz
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddQuiz;