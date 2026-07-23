import axios from "axios";

const API_URL = "http://localhost:8082/api/discussions";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getDiscussions = () =>
    axios.get(API_URL, authHeader());

export const getDiscussion = (id) =>
    axios.get(`${API_URL}/${id}`, authHeader());

export const createDiscussion = (courseId, userId, discussion) =>
    axios.post(
        `${API_URL}/${courseId}/${userId}`,
        discussion,
        authHeader()
    );

export const answerDiscussion = (id, answer) =>
    axios.put(
        `${API_URL}/${id}/answer?answer=${encodeURIComponent(answer)}`,
        {},
        authHeader()
    );

export const deleteDiscussion = (id) =>
    axios.delete(`${API_URL}/${id}`, authHeader());