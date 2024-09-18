import axios from "axios";
import { API_BASE_URL } from "./constants";

let isRefreshing = false;
let refreshSubscribers = [];

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to add subscribers to be notified once the token is refreshed
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Function to notify subscribers with the new token
const onRefreshed = (newToken) => {
  refreshSubscribers.map((cb) => cb(newToken));
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (
      response &&
      response.status === 401 &&
      response.data === "JWT token has expired"
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken"); // or wherever you store it
          const response = await axios.post(
            `${API_BASE_URL}/api/v1/auth/refresh`,
            {
              refreshToken,
            }
          );

          const newToken = response.data.token; // Assuming your response contains the new token
          localStorage.setItem("token", newToken);

          isRefreshing = false;
          onRefreshed(newToken);
          refreshSubscribers = [];
        } catch (err) {
          isRefreshing = false;
          refreshSubscribers = [];
          window.location.href = "/signin";
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axios(originalRequest));
        });
      });

      return retryOriginalRequest;
    } else if (response && response.status === 403) {
      // Handle 403 Forbidden response
      console.log("Request failed with status code 403", response);
      // Redirect to the root directory or show an appropriate message
    }
    return Promise.reject(error);
  }
);

export { instance };
