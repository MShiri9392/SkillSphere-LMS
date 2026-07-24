import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/courses`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getCourses = () =>
    axios.get(API, authHeader());

export const getCourse = (id) =>
    axios.get(`${API}/${id}`, authHeader());

export const addCourse = (course) =>
    axios.post(API, course, authHeader());

export const updateCourse = (id, course) =>
    axios.put(`${API}/${id}`, course, authHeader());

export const deleteCourse = (id) =>
    axios.delete(`${API}/${id}`, authHeader());