import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const weatherClient = axios.create({
  baseURL: `https://api.open-meteo.com/v1`,
  timeout: 5000,
});

const geoClient = axios.create({
  baseURL: `https://geocoding-api.open-meteo.com/v1`,
  timeout: 5000,
});

const apiClient = axios.create({
  baseURL: API_URL,
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { weatherClient , geoClient, apiClient };
