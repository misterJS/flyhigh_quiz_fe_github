import axios from "axios";
import qs from "qs";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
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
export const QuizPreview = async (params) => {
  const response = await API.get("/read/GetQuizGenDetail", { params });
  return response.data;
};

// Toggle save/unsave quiz for a student
// Expects: { guid, studentId, isSaved }
export const SaveQuizToggle = async ({ guid, studentId, isSaved }) => {
  try {
    const form = new FormData();
    form.append("guid", String(guid));
    form.append("studentId", String(studentId));
    // backend accepts boolean as string
    form.append("isSaved", String(Boolean(isSaved)));

    const response = await API.post("/Insert/SaveQuiz", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error calling SaveQuizToggle:", error);
    throw error;
  }
};

// Get saved quizzes list by student
export const GetSavedQuizzes = async ({ studentId, page = 1, pageSize = 10 }) => {
  const params = { studentId, page, pageSize };
  const response = await API.get("/read/GetSavedQuizzes", { params });
  return response.data;
};

// Check daily limit for a student
export const CheckDailyLimitByStudent = async (studentId) => {
  const response = await API.get("/read/checkDailyLimitByStudent", { params: { studentId } });
  return response.data; // expected { limitReached: boolean, answeredToday: number, limit: number }
};

export const GetQuizReview = async ({ startId, wrongOnly = false, Key } = {}) => {
  if (!startId) throw new Error("startId is required");
  const params = { startId, wrongOnly };
  if (Key) params.Key = Key; // opsional kalau perlu API key

  const response = await API.get("/read/GetQuizReview", { params });
  return response.data; // shape sama seperti contoh kamu (questions, totalQuestions, dll)
};

