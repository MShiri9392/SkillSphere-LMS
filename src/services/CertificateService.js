import axios from "axios";

const API_URL = "http://localhost:8082/api/certificates";

const getToken = () => localStorage.getItem("token");

const axiosConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllCertificates = () => {
    return axios.get(API_URL, axiosConfig());
};

export const generateCertificate = (enrollmentId) => {
    return axios.post(
        `${API_URL}/generate/${enrollmentId}`,
        {},
        axiosConfig()
    );
};

export const deleteCertificate = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        axiosConfig()
    );
};