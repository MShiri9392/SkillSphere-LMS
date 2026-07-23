import axios from "axios";

const API_URL = "http://localhost:8082/api/announcements";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAnnouncements = () =>
    axios.get(API_URL, authHeader());

export const getAnnouncement = (id) =>
    axios.get(`${API_URL}/${id}`, authHeader());

export const createAnnouncement = (courseId, announcement) =>
    axios.post(`${API_URL}/${courseId}`, announcement, authHeader());

export const updateAnnouncement = (id, announcement) =>
    axios.put(`${API_URL}/${id}`, announcement, authHeader());

export const deleteAnnouncement = (id) =>
    axios.delete(`${API_URL}/${id}`, authHeader());