
import axios from "axios";
import { isAccessTokenValid, logoutUser } from "../utils/auth"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // Do not send requests using an expired access token.
    if (token && !isAccessTokenValid()) {
      logoutUser();
      return Promise.reject(
        new axios.CanceledError("Access token expired")
      );
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
    }

    return Promise.reject(error);
  }
);

export default api;
