import axios from "axios";

const API = "http://localhost:8082/api/users";

const token = () => localStorage.getItem("token");

const headers = () => ({
    headers: {
        Authorization: `Bearer ${token()}`
    }
});

export const getUsers = () =>
    axios.get(API, headers());

export const getUser = (id) =>
    axios.get(`${API}/${id}`, headers());

export const addUser = (user) =>
    axios.post(API, user, headers());

export const updateUser = (id, user) =>
    axios.put(`${API}/${id}`, user, headers());

export const deleteUser = (id) =>
    axios.delete(`${API}/${id}`, headers());