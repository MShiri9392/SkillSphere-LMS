import axios from "axios";

const API = "import.meta.env.VITE_API_URL";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getSubmissions = () =>
    axios.get(API, authHeader());

export const getSubmission = (id) =>
    axios.get(`${API}/${id}`, authHeader());

export const getStudentSubmissions = (userId) =>
    axios.get(`${API}/student/${userId}`, authHeader());

export const submitAssignment = (assignmentId, userId, submission) =>
    axios.post(
        `${API}/${assignmentId}/${userId}`,
        submission,
        authHeader()
    );

export const gradeSubmission = (id, grade, feedback) =>
    axios.put(
        `${API}/${id}/grade?grade=${grade}&feedback=${encodeURIComponent(feedback)}`,
        {},
        authHeader()
    );

export const deleteSubmission = (id) =>
    axios.delete(`${API}/${id}`, authHeader());