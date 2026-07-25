import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/enrollments`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const enrollCourse = (enrollment) =>
    axios.post(API, enrollment, authHeader());

export const getEnrollments = () =>
    axios.get(API, authHeader());

export const getUserEnrollments = (userId) =>
    axios.get(`${API}/user/${userId}`, authHeader());

export const deleteEnrollment = (id) =>
    axios.delete(`${API}/${id}`, authHeader());