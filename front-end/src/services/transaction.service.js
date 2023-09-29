/**
 * This is a service for making requests to the API for transcations.
 * It has functions for getting all transcations, getting a specific transction, creating a new transction, and updating an existing transction.
 */
import axios from "axios";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/transcation/"
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

const TranscationService = {
  getAll,
  get,
  create,
  update,
//   remove,
//   removeAll,
};

export default TranscationService;
