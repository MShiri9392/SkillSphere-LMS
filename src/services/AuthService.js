import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL";

export const forgotPassword = (email) => {
    return axios.post(`${BASE_URL}/forgot-password`, {
        email
    });
};

export const resetPassword = (token, password) => {
    return axios.post(`${BASE_URL}/reset-password`, {
        token,
        password
    });
};