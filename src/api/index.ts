import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../constants/SERVER_URL";


const api = axios.create({
  baseURL: `${SERVER_URL}api/v1`,
});

// Set Authorization header if auth token exists
const setAuthorizationHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const authString = localStorage.getItem("auth");
  const auth = authString ? JSON.parse(authString) : null;

  if (auth && auth.token) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
};

// Add request interceptor
api.interceptors.request.use(
  (config) => setAuthorizationHeader(config),
  (error) => Promise.reject(error)
);

export default api;