import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

export const ClientForm = ({ onSubmit, loginDetails }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    birthDate: "",
    doctorId: loginDetails.user.userId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent component's submit handler
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form className="w-full" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label className="font-bold">Vorname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Vorname eingeben"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Nachname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nachname eingeben"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBirthDate">
          <Form.Label>Geburtsdatum</Form.Label>
          <Form.Control
            type="date"
            placeholder="Geburtsdatum Eingeben"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email eingeben"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formPhoneNumber">
          <Form.Label>Telefonnummer</Form.Label>
          <Form.Control
            type="text"
            placeholder="+49"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGender">
          <Form.Label>Geschlecht</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="other">Diverse</option>
          </Form.Control>
        </Form.Group>
      </Row>
      <button className="custom-button mt-4" type="submit">
        Hinzufügen
      </button>
    </Form>
  );
};
