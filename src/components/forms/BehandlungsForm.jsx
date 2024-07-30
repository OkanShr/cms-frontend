import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export const BehandlungsForm = ({
  clientName,
  clientLastName,
  onDocuDataChange,
  onFinalSubmit,
  appointmentData,
}) => {
  const [docuFormData, setDocuFormData] = useState({
    datum: appointmentData.date || "",
    name: clientLastName || "",
    vorname: clientName || "",
    geburtsdatum: "",
    vorerkrankungen: "",
    vormedikation: "",
    allergie: "",
    beschwerden: "",
    behandlungswunsch: "",
    behandlung: "",
    material: "",
    komplikationen: "",
    gpkontrolle: "",
    gpfolgetherapie: "",
  });

  useEffect(() => {
    // Update docuFormData whenever appointmentData, clientName or clientLastName changes
    setDocuFormData((prevData) => ({
      ...prevData,
      datum: appointmentData.date || "",
      name: clientLastName || "",
      vorname: clientName || "",
    }));
  }, [appointmentData, clientName, clientLastName]);

  useEffect(() => {
    // Call onDocuDataChange whenever docuFormData changes
    onDocuDataChange(docuFormData);
  }, [docuFormData, onDocuDataChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocuFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinalSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(docuFormData).map((key) => (
        <Form.Group className="mb-3" controlId={key} key={key}>
          <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter ${key}`}
            name={key}
            value={docuFormData[key]}
            onChange={handleChange}
          />
        </Form.Group>
      ))}
      <Button
        className="mr-4 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        onClick={handleSubmit}
      >
        Abbrechen
      </Button>
      <Button
        className="float-right text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
        type="submit"
      >
        Nächste
      </Button>
    </Form>
  );
};
