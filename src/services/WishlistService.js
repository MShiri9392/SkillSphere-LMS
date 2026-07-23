import axios from "axios";

const API_URL = "http://localhost:8082/api/wishlist";

const getToken = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllWishlist = () => {
    return axios.get(API_URL, config());
};

export const addToWishlist = (userId, courseId) => {
    return axios.post(
        `${API_URL}/${userId}/${courseId}`,
        {},
        config()
    );
};

export const deleteWishlist = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        config()
    );
};