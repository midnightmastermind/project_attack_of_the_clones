/**
 * This is an API service for user site availability.
 * It has functions to get all user site availability data, get a specific user site availability data, create a user site availability data, and update a user site availability data.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/user_site_availability/"
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

// const remove = id => {
//     return axios.delete(`${API_URL}/${id}`);
// };

// const removeAll = () => {
//     return axios.delete(`${API_URL}`);
// };

const UserSiteAvailabilityService = {
  getAll,
  get,
  create,
  update,
//   remove,
//   removeAll,
};

export default UserSiteAvailabilityService;
