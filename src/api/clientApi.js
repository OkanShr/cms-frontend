import { instance as axiosInstance } from "./apiInterceptor";

export const getAllClients = (token) => {
  return axiosInstance.get("/api/client", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClientById = (id, token) => {
  return axiosInstance.get("/api/client/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateClient = (post, token, id) => {
  return axiosInstance.put("/api/client/" + id, post, {
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

// Function to get client images by client ID
export const getClientImages = (clientId, token) => {
  return axiosInstance.get(`/api/client-images/${clientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to upload client image
export const uploadClientImage = (clientId, file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`/api/client-images/${clientId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to get client PDFs by client ID
export const getClientPdfs = (clientId, token) => {
  return axiosInstance.get(`/api/client-pdfs/${clientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to upload client PDF
export const uploadClientPdf = (clientId, file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`/api/client-pdfs/${clientId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to delete client PDF
export const deleteClientPdf = (clientId, pdfId, token) => {
  return axiosInstance.delete(`/api/client-pdfs/${clientId}/delete/${pdfId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to delete client Image
export const deleteClientImage = (clientId, imageId, token) => {
  return axiosInstance.delete(
    `/api/client-images/${clientId}/delete/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//Function to get last created clients based on months (eg. Last 3 Months)
export const lastCreatedClientNumber = (months, token) => {
  return axiosInstance.get(`/api/client/created/last${months}months`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Function to get count of clients
export const getClientCount = (token) => {
  return axiosInstance.get(`/api/client/total`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Function to get count of clients for each of the last 6 months from now
export const getRegisterGraphData = (token) => {
  return axiosInstance.get(`/api/client/created/forEachLast6Months`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
