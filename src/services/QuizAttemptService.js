import axios from "axios";

const API = "http://localhost:8082/api/quiz-attempts";

export const submitQuiz = (attempt) => {
    return axios.post(API, attempt);
};

export const getAttempts = () => {
    return axios.get(API);
};

export const getAttempt = (id) => {
    return axios.get(`${API}/${id}`);
};

export const deleteAttempt = (id) => {
    return axios.delete(`${API}/${id}`);
};