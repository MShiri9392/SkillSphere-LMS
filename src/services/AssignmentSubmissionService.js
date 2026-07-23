import axios from "axios";

const API_URL = "http://localhost:8082/api/submissions";

const getToken = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllSubmissions = () => {
    return axios.get(API_URL, config());
};

export const submitAssignment = (assignmentId, userId, submission) => {
    return axios.post(
        `${API_URL}/${assignmentId}/${userId}`,
        submission,
        config()
    );
};

export const gradeSubmission = (id, grade, feedback) => {
    return axios.put(
        `${API_URL}/${id}/grade?grade=${grade}&feedback=${encodeURIComponent(feedback)}`,
        {},
        config()
    );
};

export const deleteSubmission = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        config()
    );
};