import axios from "axios";
import { loadConfig } from "./config";

let apiInstance = null;

const getAPIInstance = async () => {
  if (!apiInstance) {
    const config = await loadConfig();
    apiInstance = axios.create({
      baseURL: `${config.apiURL}kiddo`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  return apiInstance;
};

export const updateProfileWithPhoto = async (formData) => {
  const API = await getAPIInstance();
  const response = await API.post("/Insert/UpdateProfileWithPhoto", formData);
  return response.data;
};
