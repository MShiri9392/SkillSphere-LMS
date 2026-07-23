import axios from "axios";

const API = "http://localhost:8082/api/quizzes";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getQuizzes = () =>
    axios.get(API, authHeader());

export const getQuiz = (id) =>
    axios.get(`${API}/${id}`, authHeader());

export const getCourseQuizzes = (courseId) =>
    axios.get(`${API}/course/${courseId}`, authHeader());

export const addQuiz = (quiz) =>
    axios.post(API, quiz, authHeader());

export const updateQuiz = (id, quiz) =>
    axios.put(`${API}/${id}`, quiz, authHeader());

export const deleteQuiz = (id) =>
    axios.delete(`${API}/${id}`, authHeader());