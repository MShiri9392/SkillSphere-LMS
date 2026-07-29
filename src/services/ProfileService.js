import axios from "axios";

// Backend:
// VITE_API_URL=https://skillsphere-ai-backend-1.onrender.com/api
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

// ==============================
// Authorization Header
// ==============================
const authHeader = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// ==============================
// Get User Profile
// ==============================
export const getProfile = (id) => {
    return axios.get(
        `${API_URL}/${id}`,
        authHeader()
    );
};

// ==============================
// Update User Profile
// ==============================
export const updateProfile = (id, user) => {
    return axios.put(
        `${API_URL}/${id}`,
        user,
        authHeader()
    );
};

// ==============================
// Change Password
// ==============================
export const changePassword = (id, data) => {
    return axios.put(
        `${API_URL}/${id}/change-password`,
        data,
        authHeader()
    );
};