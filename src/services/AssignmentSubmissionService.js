import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/submissions`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// Get all submissions
export const getAllSubmissions = () => {
    return axios.get(API_URL, authHeader());
};

// Get submission by ID
export const getSubmission = (id) => {
    return axios.get(`${API_URL}/${id}`, authHeader());
};

// Get student's submissions
export const getStudentSubmissions = (userId) => {
    return axios.get(
        `${API_URL}/student/${userId}`,
        authHeader()
    );
};

// Submit assignment
export const submitAssignment = (assignmentId, userId, submission) => {
    return axios.post(
        `${API_URL}/${assignmentId}/${userId}`,
        submission,
        authHeader()
    );
};

// Grade submission
export const gradeSubmission = (id, grade, feedback) => {
    return axios.put(
        `${API_URL}/${id}/grade?grade=${grade}&feedback=${encodeURIComponent(feedback)}`,
        {},
        authHeader()
    );
};

// Delete submission
export const deleteSubmission = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        authHeader()
    );
};