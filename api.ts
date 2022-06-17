import axios from "axios";
const baseUrlCacheServer = "http://localhost:8000/api/v2/";

const baseUrlMainServer = "http://localhost:5000/api/v2/";

export default axios.create({
  baseURL: baseUrlMainServer,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const cacheServerUrl = axios.create({
  baseURL: baseUrlCacheServer,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrlMainServer,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
