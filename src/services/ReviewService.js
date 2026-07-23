import axios from "axios";

const API_URL = "http://localhost:8082/api/reviews";

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