import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL";

const getToken = () => localStorage.getItem("token");

const axiosConfig = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllProgress = () => {
    return axios.get(API_URL, axiosConfig());
};

export const addProgress = (enrollmentId, progress) => {
    return axios.post(
        `${API_URL}/${enrollmentId}`,
        progress,
        axiosConfig()
    );
};

export const updateProgress = (id, progress) => {
    return axios.put(
        `${API_URL}/${id}`,
        progress,
        axiosConfig()
    );
};

export const deleteProgress = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        axiosConfig()
    );
};