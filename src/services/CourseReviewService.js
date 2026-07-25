import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL";

const getToken = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllReviews = () => {
    return axios.get(API_URL, config());
};

export const addReview = (courseId, userId, review) => {
    return axios.post(
        `${API_URL}/${courseId}/${userId}`,
        review,
        config()
    );
};

export const deleteReview = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        config()
    );
};