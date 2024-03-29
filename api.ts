import axios from "axios";
const baseUrlCacheServer = "https://cache-server-cs-tracker.cyclic.app/api/v2";

const baseUrlMainServer = "https://cs-tracker-backend.cyclic.app/api/v2";

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
