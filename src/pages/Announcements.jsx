import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAnnouncements,
  deleteAnnouncement,
} from "../services/AnnouncementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error loading announcements:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await deleteAnnouncement(id);
        loadAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Announcements</h2>

        <Link to="/add-announcement" className="btn btn-primary">
          Add Announcement
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.id}</td>
                <td>{announcement.title}</td>
                <td>{announcement.message}</td>
                <td>{announcement.createdAt}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Announcements Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Announcements;