import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getDashboardStats = () =>
    axios.get(API_URL, authHeader());