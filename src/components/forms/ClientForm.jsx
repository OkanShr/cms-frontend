import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

export const ClientForm = ({ onNext, loginDetails }) => {
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
    <Form className="w-full" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>Vorname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Nachname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Telefonnummer eingeben"
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
      <button
        className="mt-3 rounded-md px-3 py-1.5 ml-6
           text-teal-800 transition-all bg-gradient-to-tr from-teal-200 to-teal-100"
        type="submit"
      >
        Nächste
      </button>
    </Form>
  );
};
