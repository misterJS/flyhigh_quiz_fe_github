import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const QuizListSubject = async () => {
  const response = await API.get("/read/QuizListSubject");
  return response.data;
};
