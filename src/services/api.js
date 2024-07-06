import axios from 'axios';

const API_URL = 'http://api.testserver.com'; // Replace with actual API URL

export const fetchProducts = async (company, category) => {
  const response = await axios.get(`${API_URL}/products`, {
    params: { company, category }
  });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
};
