/**
 * This is a service for handling enrollments.
 * It contains functions for getting all enrollments, getting a specific enrollment by id, creating an enrollment, updating an enrollment, getting all enrollments for a specific user, and getting all enrollments for a specific site.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/enrollment"
const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
};

const create = data => {
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {headers: authHeader()});
};

const getAllForUser = () => {
    return axios.get(`${API_URL}/for-user`, {headers: authHeader()});
};

const getAllForSite = () => {
    return axios.get(`${API_URL}/for-site`, {headers: authHeader()});
};

// const remove = id => {
//     return axios.delete(`${API_URL}/${id}`);
// };

// const removeAll = () => {
//     return axios.delete(`${API_URL}`);
// };

const EnrollmentService = {
  getAll,
  get,
  create,
  update,
  getAllForSite,
  getAllForUser
//   remove,
//   removeAll,
};

export default EnrollmentService;
