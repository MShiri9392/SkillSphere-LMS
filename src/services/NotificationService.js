import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAllNotifications = () => {
    return axios.get(API_URL, getAuthHeader());
};

export const getUserNotifications = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`, getAuthHeader());
};

export const createNotification = (notification) => {
    return axios.post(API_URL, notification, getAuthHeader());
};

export const markAsRead = (id) => {
    return axios.put(`${API_URL}/read/${id}`, {}, getAuthHeader());
};

export const deleteNotification = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeader());
};