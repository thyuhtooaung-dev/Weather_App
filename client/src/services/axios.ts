import axios from "axios";

const API_URL =
  // import.meta.env.VITE_API_URL ?? "https://weather-app-backend-bzxa.onrender.com";
  "http://localhost:3000";

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
  withCredentials: true,
});

export { weatherClient, geoClient, apiClient };
