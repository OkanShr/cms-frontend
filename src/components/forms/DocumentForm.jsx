import React, { useState } from "react";
import { Form } from "react-bootstrap";

export const DocumentForm = ({
  onDSEFileChange,
  onAFNFileChange,
  onFinalSubmit,
}) => {
  const [selectedDSEFile, setSelectedDSEFile] = useState(null);
  const [selectedAFNFile, setSelectedAFNFile] = useState(null);

  const handleDSEFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedDSEFile(file);
    onDSEFileChange(file); // Notify parent about file change
  };

  const handleAFNFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedAFNFile(file);
    onAFNFileChange(file); // Notify parent about file change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinalSubmit(); // Trigger final submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Datenschutz Einwilligung */}
      <Form.Group controlId="formDSEFile" className="mt-10">
        <Form.Label>Datenschutz Einwilligung</Form.Label>
        <Form.Control type="file" onChange={handleDSEFileChange} />
      </Form.Group>

      {/* Aufnahmeformular Neukunden */}
      <Form.Group controlId="formAFNFile" className="my-10">
        <Form.Label>Aufnahmeformular Neukunden</Form.Label>
        <Form.Control type="file" onChange={handleAFNFileChange} />
      </Form.Group>

      <button
        className="mt-3 rounded-md px-3 py-1.5 ml-6
           text-teal-800 transition-all bg-gradient-to-tr from-teal-200 to-teal-100"
        type="submit"
      >
        Kunde Erstellen
      </button>
      {/* right corner */}
    </Form>
  );
};
