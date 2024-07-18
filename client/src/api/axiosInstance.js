// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Update this to your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
