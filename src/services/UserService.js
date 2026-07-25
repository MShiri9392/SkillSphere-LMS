import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getUsers = () =>
    axios.get(API, authHeader());

export const getUser = (id) =>
    axios.get(`${API}/${id}`, authHeader());

export const addUser = (user) =>
    axios.post(API, user, authHeader());

export const updateUser = (id, user) =>
    axios.put(`${API}/${id}`, user, authHeader());

export const deleteUser = (id) =>
    axios.delete(`${API}/${id}`, authHeader());