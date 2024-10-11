import { instance as axiosInstance } from "./apiInterceptor";

export const loginUser = async (post) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/signin", post);
    return response.data;
  } catch (error) {
    if (!error.response) {
      // Network error
      return "Server is not running";
    } else if (error.response.status === 401) {
      // Invalid login
      return "Wrong username or password";
    } else if (error.response.status === 429) {
      // Too many attempts
      return "Too many attempts.";
    } else {
      // Other errors
      throw error;
    }
  }
};

export const registerUser = (post) => {
  return axiosInstance.post("/api/v1/auth/signup", post);
};
