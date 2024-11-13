// api/axiosInstance.js
import axios from 'axios';

// Create an instance of axios with a base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optionally, set up an interceptor to add an Authorization header for authenticated requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
