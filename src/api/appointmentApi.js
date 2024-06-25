import { instance as axiosInstance } from "./apiInterceptor";

export const getAllAppointments = (token, id) => {
  return axiosInstance.get("/api/appointment/client/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAppointmentsByDoctor = (token) => {
  return axiosInstance.get("/api/appointment/clients/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentById = (id, token) => {
  return axiosInstance.get("/api/appointment/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateAppointment = (post, id, token) => {
  return axiosInstance.put("/api/appointment/" + id, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteAppointment = (id, token) => {
  return axiosInstance.delete("/api/appointment/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createAppointment = (post, token) => {
  return axiosInstance.post("/api/appointment", post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentData = (token) => {
  return axiosInstance.get("/api/appointment/countByType", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppointmentPdf = async (id, token) => {
  return axiosInstance.get(`/api/appointment-pdfs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllAppointmentPdfsByClient = async (id, token) => {
  return axiosInstance.get(`/api/appointment-pdfs/by-client/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAppointmentPdf = (file, type, id, token) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return axiosInstance.post(`/api/appointment-pdfs/${id}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAppointmentPdf = (AppointmentId, PdfId, token) => {
  return (
    axiosInstance.delete(
      "/api/appointment-pdfs/" + AppointmentId + "/delete/" + PdfId
    ),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
