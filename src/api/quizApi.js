import axios from "axios";
import qs from "qs";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "repeat" }), 
});

export const QuizSubjectAll = async () => {
  const response = await API.get("/read/QuizSubjectAll");
  return response.data;
};
export const QuizGradeAll = async () => {
  const response = await API.get("/read/QuizGradeAll");
  return response.data;
};
export const QuizCategories = async () => {
  const response = await API.get("/read/GetListQuizCategory");
  return response.data;
};
export const AllQuizList = async (params) => {
  try {
    const response = await API.get("/read/GetListQuizQuestion", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz list:", error);
    throw error;
  }
};
export const QuizPreview = async () => {
  const response = await API.get("/read/QuizPreview?quizId=1");
  return response.data;
};
