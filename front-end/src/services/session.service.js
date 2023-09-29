/**
 * This is a service for making requests to a session API.
 * It contains functions for making GET, POST, and PUT requests, as well as a few commented out functions for making DELETE requests.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/session/"
const getAll = () => {
    return axios.get(API_URL);
};

const get = id => {
    return axios.get(`${API_URL}/${id}`);
};

const create = data => {
    console.log(data);
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    console.log(id);
    console.log(data);
    return axios.put(`${API_URL}${id}`, data, {headers: authHeader()});
};

// const remove = id => {
//     return axios.delete(`${API_URL}/${id}`);
// };

// const removeAll = () => {
//     return axios.delete(`${API_URL}`);
// };

const SessionService = {
  getAll,
  get,
  create,
  update,
//   remove,
//   removeAll,
};

export default SessionService;
