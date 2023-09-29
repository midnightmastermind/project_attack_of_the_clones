/**
 * This code contains a service for performing CRUD operations on users.
 * It uses the axios library to make HTTP requests, and the auth-header library to add authentication headers to those requests.
 * The API_URL variable defines the base URL for the API endpoint being used.
 * The getAll, getMentors differenciates between getting all users and getting all mentors
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/user";

const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const getAllForSite = () => {
    return axios.get(`${API_URL}/for-site`, {headers: authHeader()});
};

const getMentors = (type) => {
    return axios.get(`${API_URL}/mentors`, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
};

const create = data => {
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
    return axios.delete(`${API_URL}`);
};



const UserService = {
  getAll,
  getMentors,
  get,
  create,
  getAllForSite,
  update,
  remove,
  removeAll,

};

export default UserService;