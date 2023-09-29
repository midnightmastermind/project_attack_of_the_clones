/**
 * This code imports the axios library and the auth-header library.
 * It also defines constants for the API domain and API URL.
 * There are functions to get public content, a user board, a mentor board, an admin board, and a global admin board.
 * These functions use the axios library to make GET
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/content/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getMentorBoard = () => {
  return axios.get(API_URL + "mentor", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getGlobalAdminBoard = () => {
    return axios.get(API_URL + "global_admin", { headers: authHeader() });
  };

const userService = {
  getPublicContent,
  getUserBoard,
  getMentorBoard,
  getAdminBoard,
  getGlobalAdminBoard
};

export default userService