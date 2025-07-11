import axios from "axios";
import { loadConfig } from "./config";

let API;

const initAPI = async () => {
  if (!API) {
    const config = await loadConfig();
    const baseURL = config.apiURL;

    API = axios.create({
      baseURL: `${baseURL}kiddo`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return API;
};

export const loginTokenWeb = async (email, password) => {
  const api = await initAPI();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await api.post("/Insert/LoginTokenWeb", formData);
  return response.data;
};

// REGISTER
export const registerApi = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  role = "student",
}) => {
  const config = await loadConfig(); // ambil baseURL
  const baseURL = config.apiURL;

  const response = await axios.post(
    `${baseURL}kiddo/Insert/Register`,
    {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const changePassword = async ({
  userId,
  newPassword,
  confirmPassword,
}) => {
  const api = await initAPI();

  const response = await api.post(
    "/Insert/ChangePassword",
    {
      userId,
      newPassword,
      confirmPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
