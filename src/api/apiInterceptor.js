import axios from "axios";
import { API_BASE_URL } from "./constants";

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(`error ${error}`);
    return Promise.reject(error);
  }
);