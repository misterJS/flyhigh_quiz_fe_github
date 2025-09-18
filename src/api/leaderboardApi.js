import axios from "axios";

const baseURL = "https://quiz.flyhigh.my/flyhigh_be/api";

const API = axios.create({
  baseURL: `${baseURL}/kiddo`,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for better error handling
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetch global all-time leaderboard
 * @param {number} top - Number of top users to fetch (default: 10)
 * @returns {Promise<Array>} Array of leaderboard data
 */
export const GlobalAllTimeLeaderboard = async (top = 10) => {
  try {
    const response = await API.get(`/Read/AllTimeLeaderboard?top=${top}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch global leaderboard: ${error.message}`);
  }
};

/**
 * Fetch all-time leaderboard (legacy function for backward compatibility)
 * @returns {Promise<Array>} Array of leaderboard data
 */
export const AllTimeLeaderboard = async () => {
  return GlobalAllTimeLeaderboard(10);
};

/**
 * Fetch weekly leaderboard
 * @param {number} top - Number of top users to fetch (default: 10)
 * @returns {Promise<Array>} Array of weekly leaderboard data
 */
export const WeeklyLeaderboard = async (top = 10) => {
  try {
    const response = await API.get(`/read/WeeklyLeaderboard?top=${top}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weekly leaderboard: ${error.message}`);
  }
};

/**
 * Fetch leaderboard data for a specific user
 * @param {number} studentId - Student ID to fetch leaderboard data for
 * @returns {Promise<Object>} User leaderboard data
 */
export const LeaderboardByUserId = async (studentId) => {
  try {
    if (!studentId) {
      throw new Error('Student ID is required');
    }
    const response = await API.get(
      `/read/leaderboardbystudentid?studentId=${studentId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user leaderboard: ${error.message}`);
  }
};
