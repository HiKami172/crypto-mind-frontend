import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies for refresh token
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await API.post(`/refresh/`, {}, { withCredentials: true });
                const newToken = data.access_token;
                localStorage.setItem('token', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return API(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;
