import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { answerDiscussion } from "../services/DiscussionService";

function AnswerDiscussion() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await answerDiscussion(id, answer);

            alert("Answer Submitted Successfully");

            navigate("/discussions");

        } catch (error) {

            console.error(error);
            alert("Failed to Submit Answer");
        }
    };

    return (

        <div className="container mt-4">

            <h2>Answer Discussion</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">

                    <label>Answer</label>

                    <textarea
                        className="form-control"
                        rows="5"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />

                </div>

                <button className="btn btn-primary">
                    Submit Answer
                </button>

            </form>

        </div>
    );
}

export default AnswerDiscussion;