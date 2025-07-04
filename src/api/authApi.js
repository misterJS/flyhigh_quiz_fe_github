import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const loginTokenWeb = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await API.post("/Insert/LoginTokenWeb", formData);
  return response.data;
};
