import axios from "axios";

const weatherApi = axios.create({
  baseURL: `https://api.open-meteo.com/v1`,
  timeout: 5000,
});

const geoApi = axios.create({
  baseURL: `https://geocoding-api.open-meteo.com/v1`,
  timeout: 5000,
});

export { weatherApi , geoApi };
