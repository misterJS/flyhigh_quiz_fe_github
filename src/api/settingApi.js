import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const GetAllLanguages = async () => {
  const response = await API.get("/read/GetAllLanguages");
  return response.data;
};
export const GetProfile = async (id) => {
  const response = await API.get("/read/GetProfile", {
    params: {
      userId: id,
    },
  });
  return response.data;
};
