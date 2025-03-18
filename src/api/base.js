import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? "http://localhost:7000/api/" : import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;
