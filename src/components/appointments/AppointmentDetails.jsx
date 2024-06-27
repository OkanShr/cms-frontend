import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAppointment, getAppointmentPdf } from "../../api/appointmentApi";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../modal.css";

const AppointmentDetails = ({
  updateAppointmentList,
  loginDetails,
  appointment,
  showDetailsModal,
  handleClose,
  setShowDetailsModal,
  setShowEditModal,
  clientId,
  clientName,
  clientLastName,
}) => {
  const [appointmentPdf, setAppointmentPdf] = useState(null);

  useEffect(() => {
    if (appointment.id && showDetailsModal) {
      fetchAppointmentPdf(appointment.id);
    }
  }, [appointment.id, showDetailsModal]);

  const fetchAppointmentPdf = async (appointmentId) => {
    try {
      const response = await getAppointmentPdf(
        appointmentId,
        clientId,
        loginDetails.token
      );
      setAppointmentPdf(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching pdf:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(appointment.id, loginDetails.token);
      handleClose();
      updateAppointmentList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  function formatPdf(pdf) {
    const formattedDoc = {
      uri: pdf.filePath,
      fileType: pdf.fileName.split(".")[1],
      fileName: pdf.fileName,
    };
    return [formattedDoc]; // Return as an array
  }

  return (
    <Modal
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      dialogClassName="w-9/12"
    >
      <Modal.Header>
        <Modal.Title>
          Appointment Details - {clientName} {clientLastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Subject: {appointment.activity}</p>
        <p>Date: {appointment.date.split("T")[0]}</p>
        <p>Time: {appointment.time}</p>
        {appointmentPdf && (
          <div className="doc-viewer-container">
            {console.log(appointment.id)}
            <DocViewer
              documents={formatPdf(appointmentPdf)}
              pluginRenderers={DocViewerRenderers}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => setShowDetailsModal(false)}
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        >
          Back
        </Button>
        <Button
          onClick={handleOpenEdit}
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        >
          Edit Appointment
        </Button>
        <Button
          onClick={handleDelete}
          className="text-dark bg-gradient-to-tr from-red-500 to-red-400 border-white"
        >
          Delete Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetails;
