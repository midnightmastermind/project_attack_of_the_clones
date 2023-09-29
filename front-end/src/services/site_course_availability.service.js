/**
 * This is an API service for site course availability.
 * It contains methods for getting all site course availability data, getting data for a specific id, creating new data, updating data, and deleting data.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;
const API_URL = "/api/site_course_availability/";

const getAll = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const get = id => {
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
};

const create = data => {
    return axios.post(API_URL, data), { headers: authHeader() };
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {headers: authHeader()});
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

// const removeAll = () => {
//     return axios.delete(`${API_URL}`);
// };

const SiteCourseAvailabilityService = {
  getAll,
  get,
  create,
  update,
  remove,
//   removeAll,
};

export default SiteCourseAvailabilityService;
