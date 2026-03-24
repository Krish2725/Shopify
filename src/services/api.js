import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};