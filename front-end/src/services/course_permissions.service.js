/**
 * This code is the CoursePermissionsService which contains methods for making requests to the backend for various CRUD operations on the data.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/course_permissions";
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

const getAllForUser= () => {
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


const CoursePermissionsService = {
  getAll,
  get,
  create,
  update,
  getAllForUser,
  getAllForSite,
//   remove,
//   removeAll,
};

export default CoursePermissionsService;
