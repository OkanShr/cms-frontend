import axios from "axios";
import { API_BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (
      response &&
      response.status === 401 &&
      response.data === "JWT token has expired"
    ) {
      // Directly redirect to the sign-in page
      window.location.href = "/signin";
      return Promise.reject(error);
    } else if (response && response.status === 403) {
      // Handle 403 Forbidden response
      console.log("Request failed with status code 403", response);
      // Redirect to the root directory or show an appropriate message
    }

    return Promise.reject(error);
  }
);

export { instance };
