/**
 * This is an API service for interacting with the attendance data.
 * There are functions for getting all data, getting data by id, creating new data, and updating existing data.
 */
import axios from "axios";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/attendance/";

const getAll = () => {
    return axios.get(API_URL);
};

const get = id => {
    return axios.get(`${API_URL}/${id}`);
};

const create = data => {
    return axios.post(API_URL, data);
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

// const remove = id => {
//     return axios.delete(`${API_URL}/${id}`);
// };

// const removeAll = () => {
//     return axios.delete(`${API_URL}`);
// };



const CourseService = {
  getAll,
  get,
  create,
  update,
//   remove,
//   removeAll
};

export default CourseService;
