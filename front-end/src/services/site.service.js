/**
 * This is a service for interacting with the site API.
 * It contains methods for getting all sites, getting a site by id, creating a new site, updating an existing site, and deleting a site.
 */
import axios from "axios";
import authHeader from "./auth-header";

const API_DOMAIN = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_DOMAIN : process.env.REACT_APP_LOCAL_API_DOMAIN;

const API_URL = "/api/site";
const getAll = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

const get = id => {
    return axios.get(`${API_URL}/${id}`, {headers: authHeader()});
};

const getByName = name => {
    return axios.post(`${API_URL}/by-name/`, {name}, {headers: authHeader()});
};

const create = data => {
    return axios.post(API_URL, data, {headers: authHeader()});
};

const update = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {headers: authHeader()});
};

const remove = id => {
    return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
    return axios.delete(`${API_URL}`);
};

const SiteService = {
  getAll,
  get,
  create,
  update,
  getByName,
  remove,
  removeAll,
};

export default SiteService;
