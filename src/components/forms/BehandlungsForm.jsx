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
    datum: appointmentData.date ? appointmentData.date : "",
    geburtsdatum: "",
    name: clientLastName ? clientLastName : "",
    vorname: clientName ? clientName : "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onDocuDataChange(docuFormData);
    onFinalSubmit();
  };
  console.log(appointmentData);

  useEffect(() => {
    onDocuDataChange(docuFormData);
  }, [docuFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocuFormData({
      ...docuFormData,
      [name]: value,
    });
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
        onClick={() => onFinalSubmit()}
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
