import axios from "axios";

const weatherClient = axios.create({
  baseURL: `https://api.open-meteo.com/v1`,
  timeout: 5000,
});

const geoClient = axios.create({
  baseURL: `https://geocoding-api.open-meteo.com/v1`,
  timeout: 5000,
});

const authClient = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export { weatherClient , geoClient, authClient };
