import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateAppointment } from "../../api/appointmentApi";
const EditAppointment = ({
  clientId,
  loginDetails,
  showEditModal,
  handleClose,
  updateAppointmentList,
  appointment,
  setShowEditModal,
  setShowDetailsModal,
}) => {
  const [formData, setFormData] = useState({
    activity: appointment.activity || "",
    date: appointment.date.split("T")[0] || "",
    clientId: clientId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      updateAppointment(formData, appointment.id, loginDetails.token).then(
        () => {
          handleClose();
          updateAppointmentList();
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log(formData);

    // Add your logic to send the data to the server or perform other actions
  };

  const handleCancel = () => {
    setShowEditModal(false);
    setShowDetailsModal(true);
  };

  return (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header>Termin hinzufügen</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="activity">
            <Form.Label>Activity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            onClick={handleCancel}
            className="mr-4 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white "
          >
            Abbrechen
          </Button>
          <Button
            className="float-right text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white "
            type="submit"
          >
            Einreichen
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointment;
