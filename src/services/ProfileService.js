import axios from "axios";

const BASE_URL = "http://localhost:8082/api/users";

const config = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getProfile = (id) =>
    axios.get(`${BASE_URL}/${id}`, config());

export const updateProfile = (id, user) =>
    axios.put(`${BASE_URL}/${id}`, user, config());
export const changePassword = (id, data) =>
    axios.put(
        `${BASE_URL}/${id}/change-password`,
        data,
        config()
    );