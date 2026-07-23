import axios from "axios";

const API_URL = "http://localhost:8082/api/payments";

const getToken = () => localStorage.getItem("token");

const config = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllPayments = () => {
    return axios.get(API_URL, config());
};

export const makePayment = (userId, courseId, payment) => {
    return axios.post(
        `${API_URL}/${userId}/${courseId}`,
        payment,
        config()
    );
};

export const deletePayment = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        config()
    );
};