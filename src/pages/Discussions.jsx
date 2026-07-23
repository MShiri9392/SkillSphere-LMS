import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDiscussions,
  deleteDiscussion,
} from "../services/DiscussionService";

function Discussions() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions = async () => {
    try {
      const response = await getDiscussions();
      setDiscussions(response.data);
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this discussion?")) {
      try {
        await deleteDiscussion(id);
        loadDiscussions();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Discussions</h2>

        <Link to="/add-discussion" className="btn btn-primary">
          Add Discussion
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Course</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {discussions.length > 0 ? (
            discussions.map((discussion) => (
              <tr key={discussion.id}>
                <td>{discussion.id}</td>
                <td>{discussion.question}</td>
                <td>{discussion.answer || "Not Answered"}</td>
                <td>{discussion.course?.title}</td>
                <td>{discussion.user?.name}</td>

                <td>
                  <Link
                    to={`/answer-discussion/${discussion.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Answer
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(discussion.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Discussions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Discussions;