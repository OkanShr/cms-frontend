import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAppointment } from "../../api/appointmentApi";
import "../modal.css";

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
    <Modal
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      dialogClassName="w-9/12"
    >
      <Modal.Header>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Subject: {appointment.activity}</p>
        <p>Date: {appointment.date.split("T")[0]}</p>
        <p>Time: {appointment.time}</p>
        {/* PDF will be shown here */}
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
