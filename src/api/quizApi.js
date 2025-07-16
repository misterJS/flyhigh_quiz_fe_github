import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const QuizSubjectAll = async () => {
  const response = await API.get("/read/QuizSubjectAll");
  return response.data;
};
export const QuizGradeAll = async () => {
  const response = await API.get("/read/QuizGradeAll");
  return response.data;
};
export const AllQuizList = async () => {
  const response = await API.get("/read/GetListQuizQuestion");
  return response.data;
};
export const QuizPreview = async () => {
  const response = await API.get("/read/QuizPreview?quizId=1");
  return response.data;
};
