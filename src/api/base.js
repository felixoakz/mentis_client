import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:7000/api/",
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;
