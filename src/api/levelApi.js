import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const AllSkillLevelList = async () => {
  const response = await API.get("/read/AllSkillLevelList");
  return response.data;
};
