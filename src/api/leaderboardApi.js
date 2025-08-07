import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
});

export const AllTimeLeaderboard = async () => {
  const response = await API.get("/read/AllTimeLeaderboard?top=10");
  return response.data;
};
export const WeeklyLeaderboard = async () => {
  const response = await API.get("/read/WeeklyLeaderboard?top=10");
  return response.data;
};
export const LeaderboardByUserId = async (studentId) => {
  const response = await API.get(
    `/read/leaderboardbystudentid?studentId=${studentId}`
  );
  return response.data;
};
