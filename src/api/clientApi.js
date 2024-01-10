export const getAllUsers = (token) => {
    return axiosInstance.get("/api/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    });
  };
  export const updateUser = (post, token) => {
    return axiosInstance.put("/api/client", post, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });
  };
  export const deleteUser = (id, token) => {
    return axiosInstance.delete("/api/client/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  export const createUser = (post, token) => {
    return axiosInstance.post("/api/client/create-client", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
