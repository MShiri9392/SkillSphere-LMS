import axios from "axios";

const API = "http://localhost:8082/api/enrollments";

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