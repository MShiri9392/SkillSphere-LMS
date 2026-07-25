import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/assignments`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAssignments = () =>
    axios.get(API, authHeader());

export const getAssignment = (id) =>
    axios.get(`${API}/${id}`, authHeader());

export const addAssignment = (assignment) =>
    axios.post(API, assignment, authHeader());

export const updateAssignment = (id, assignment) =>
    axios.put(`${API}/${id}`, assignment, authHeader());

export const deleteAssignment = (id) =>
    axios.delete(`${API}/${id}`, authHeader());