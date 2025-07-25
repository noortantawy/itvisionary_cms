import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPages = () => axios.get(`${API_URL}/pages`);
export const getPage = (slug) => axios.get(`${API_URL}/pages/${slug}`);
export const createPage = (data) => axios.post(`${API_URL}/pages`, data);
export const updatePage = (slug, data) => axios.put(`${API_URL}/pages/${slug}`, data);
export const deletePage = (slug) => axios.delete(`${API_URL}/pages/${slug}`);
export const getComponents = () => axios.get(`${API_URL}/components`);
export const createComponent = (data) => axios.post(`${API_URL}/components`, data);
