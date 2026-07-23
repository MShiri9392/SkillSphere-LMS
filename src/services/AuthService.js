import axios from "axios";

const API_URL = "http://localhost:8082/api/users";

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