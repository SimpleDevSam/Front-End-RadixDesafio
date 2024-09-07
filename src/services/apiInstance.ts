import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://back-end-h5fu.onrender.com/',
    withCredentials: false,
  });