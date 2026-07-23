import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnnouncement } from "../services/AnnouncementService";

function AddAnnouncement() {
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAnnouncement(courseId, announcement);
      alert("Announcement Added Successfully");
      navigate("/announcements");
    } catch (error) {
      console.error(error);
      alert("Failed to add announcement");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Announcement</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course ID</label>
          <input
            type="number"
            className="form-control"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={announcement.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="4"
            value={announcement.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Save Announcement
        </button>
      </form>
    </div>
  );
}

export default AddAnnouncement;