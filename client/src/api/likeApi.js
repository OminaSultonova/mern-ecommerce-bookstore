// api/likeApi.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Replace with your actual backend URL

export const getUserLikes = async (googleId) => {
  try {
    const response = await axios.get(`${API_URL}/likes/${googleId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch liked items');
  }
};

export const addUserLike = async (googleId, product) => {
  try {
    const response = await axios.post(`${API_URL}/likes`, { googleId, product });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add liked item');
  }
};

export const removeUserLike = async (googleId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/likes/${googleId}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove liked item');
  }
};
