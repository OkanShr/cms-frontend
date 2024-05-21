import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAppointment } from "../../api/appointmentApi";
import { Slider } from "../misc/Slider";
import { Maximize2, Minimize2 } from "lucide-react";

const AppointmentDetails = ({
  updateAppointmentList,
  loginDetails,
  appointment,
  showDetailsModal,
  handleClose,
  setShowDetailsModal,
  setShowEditModal,
}) => {
  const handleDelete = () => {
    try {
      deleteAppointment(appointment.id, loginDetails.token).then(() => {
        handleClose();
        updateAppointmentList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  return (
    <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Subject: {appointment.activity}</p>
        {/* <p>Medications: {appointment.medication}</p> */}
        {/* <p>Complications: {appointment.complications}</p> */}
        <p>Date: {appointment.date.split("T")[0]}</p>
        <p>Time: {appointment.time}</p>
        {/* PDF will be shown here */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleOpenEdit}
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        >
          Edit Appointment
        </Button>
        <Button
          onClick={handleDelete}
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        >
          Delete Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetails;
