import { useState } from "react";
import { submitQuiz } from "../services/QuizAttemptService";

function QuizAttempt() {

    const [quizId, setQuizId] = useState("");
    const [score, setScore] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const data = {
                userId: 3,
                quizId: Number(quizId),
                score: Number(score)
            };

            const response = await submitQuiz(data);

            alert("Quiz Submitted Successfully!");

            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert("Quiz Submission Failed");

        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4 text-center">
                    Submit Quiz
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Quiz ID
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={quizId}
                            onChange={(e) => setQuizId(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Score
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        Submit Quiz
                    </button>

                </form>

            </div>

        </div>

    );

}

export default QuizAttempt;