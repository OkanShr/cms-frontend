import { instance as axiosInstance } from "./apiInterceptor";

export const getAllClients = (token) => {
  
    return axiosInstance.get("/api/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    });
  };
  export const getClientById = (id ,token) => {
      return axiosInstance.get("/api/client/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        
      });
    };
  export const updateClient = (post, token, id) => {
    return axiosInstance.put("/api/client/"+ id, post, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });
  };
  export const deleteClient = (id, token) => {
    return axiosInstance.delete("/api/client/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const createClient = (post, token) => {
    return axiosInstance.post("/api/client", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
