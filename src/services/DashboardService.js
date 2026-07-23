import axios from "axios";

const API_URL = "http://localhost:8082/api/dashboard";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getDashboardStats = () =>
    axios.get(API_URL, authHeader());