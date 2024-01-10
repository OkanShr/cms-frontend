import { instance as axiosInstance } from "./apiInterceptor";

export const loginUser = (post) => 
{
  return axiosInstance.post("/api/v1/auth/signin", post);
};

export const registerUser = (post) => 
{
  return axiosInstance.post("/api/v1/auth/signup", post);
};