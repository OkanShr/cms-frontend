import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const AppointmentForm = ({ onNext, clientId, handleClose }) => {
  const [formData, setFormData] = useState({
    activity: "",
    date: "",
    time: "",
    clientId: clientId,
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Pass the form data to the parent
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
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
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="time">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="Consulting">Consulting</option>
          <option value="Surgery">Surgery</option>
          <option value="Injection">Injection</option>
        </Form.Control>
      </Form.Group>

      <Button
        onClick={handleClose}
        className="mr-4 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
      >
        Cancel
      </Button>

      <Button
        className="float-right text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
};
