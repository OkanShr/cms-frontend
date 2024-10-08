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
    time: appointment.time || "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header>Termin hinzufügen</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="activity">
            <Form.Label>Activity</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.activity}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Art auswählen</option>
              <option value="Laser">Laser</option>
              <option value="Beratung">Beratung</option>
              <option value="Operation">Operation</option>
              <option value="Injektion">Injektion</option>
            </Form.Control>
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
          <Form.Group controlId="time">
            <Form.Label>Uhrzeit</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={(e) => handleInputChange(e, "appointment")}
            />
          </Form.Group>

          <button className="custom-button" onClick={handleCancel}>
            Abbrechen
          </button>
          <button className="custom-button" type="submit">
            Einreichen
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointment;
