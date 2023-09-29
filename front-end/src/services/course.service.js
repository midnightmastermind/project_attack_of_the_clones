/**
 * This code is the CourseService which contains various functions for interacting with the courses.
 * These functions include getting all courses, getting a specific course, creating a course, updating a course, removing a course, and removing all courses.
 */
import axios from "axios";
import authHeader from "./auth-header";
const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/course";

const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const getAllForSite = () => {
    return axios.get(`${API_URL}/for-site`, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/by-id/${id}`, {headers: authHeader()});
};

const create = (data) => {
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/by-id/${id}`, data, {headers: authHeader()});
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
    return axios.delete(`${API_URL}`);
};

const CourseService = {
  getAll,
  getAllForSite,
  get,
  create,
  update,
  removeAll,
  remove
};

export default CourseService;
