import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

export const apiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
  });