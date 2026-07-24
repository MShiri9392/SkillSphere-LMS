import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getReviews = () =>
    axios.get(API_URL, authHeader());

export const getReview = (id) =>
    axios.get(`${API_URL}/${id}`, authHeader());

export const addReview = (courseId, userId, review) =>
    axios.post(
        `${API_URL}/${courseId}/${userId}`,
        review,
        authHeader()
    );

export const deleteReview = (id) =>
    axios.delete(`${API_URL}/${id}`, authHeader());