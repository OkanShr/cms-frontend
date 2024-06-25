import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAppointment, getAppointmentPdf } from "../../api/appointmentApi";
import { Document, Page, pdfjs } from "react-pdf";
import "../modal.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AppointmentDetails = ({
  updateAppointmentList,
  loginDetails,
  appointment,
  showDetailsModal,
  handleClose,
  setShowDetailsModal,
  setShowEditModal,
  clientName,
  clientLastName,
}) => {
  const [appointmentPdf, setAppointmentPdf] = useState(null);

  useEffect(() => {
    if (appointment.id && showDetailsModal) {
      fetchAppointmentPdf(appointment.id);
    }
  }, [appointment.id, showDetailsModal]);

  const fetchAppointmentPdf = async (id) => {
    try {
      const response = await getAppointmentPdf(id, loginDetails.token);
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
          <Document file={appointmentPdf.filePath}>
            <Page
              size={"A4"}
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
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
