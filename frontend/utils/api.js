import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
});

export const getPages = async () => {
  try {
    const response = await api.get('/pages');
    return response.data;
  } catch (error) {
    console.error('API Error in getPages:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch pages');
  }
};

export const getPage = async (slug) => {
  try {
    const response = await api.get(`/pages/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`API Error in getPage (${slug}):`, error.response?.data || error.message);
    throw error.response?.data || new Error(`Failed to fetch page ${slug}`);
  }
};

export const createPage = async (data) => {
  try {
    const response = await api.post('/pages', data);
    return response.data;
  } catch (error) {
    console.error('API Error in createPage:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to create page');
  }
};

export const updatePage = async (slug, data) => {
  try {
    const response = await api.put(`/pages/${slug}`, data);
    return response.data;
  } catch (error) {
    console.error(`API Error in updatePage (${slug}):`, error.response?.data || error.message);
    throw error.response?.data || new Error(`Failed to update page ${slug}`);
  }
};

export const deletePage = async (slug) => {
  try {
    const response = await api.delete(`/pages/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`API Error in deletePage (${slug}):`, error.response?.data || error.message);
    throw error.response?.data || new Error(`Failed to delete page ${slug}`);
  }
};

export const getComponents = async () => {
  try {
    const response = await api.get('/components');
    return response.data;
  } catch (error) {
    console.error('API Error in getComponents:', error.response?.data || error.message);
    throw error.response?.data || new Error('Failed to fetch components');
  }
};