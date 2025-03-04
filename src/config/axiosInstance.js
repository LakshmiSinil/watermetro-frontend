import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // For Vite projects
});

// Request Interceptor to Add Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Or whatever key you use
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
