import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getCertificates = () => {
    return axios.get(
        `${API}/certificates`,
        authHeader()
    );
};

export const generateCertificate = (enrollmentId) => {
    return axios.post(
        `${API}/certificates/generate/${enrollmentId}`,
        {},
        authHeader()
    );
};