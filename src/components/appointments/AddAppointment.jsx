import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import {
  createAppointment,
  createAppointmentPdf,
} from "../../api/appointmentApi";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import templateFile from "../../assets/bhf_template.docx";

const AddAppointment = ({
  clientId,
  clientName,
  clientLastName,
  loginDetails,
  showAddModal,
  handleClose,
  updateAppointmentList,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    activity: "",
    date: "",
    time: "",
    clientId: clientId || "",
    type: "",
  });
  const [docuFormData, setDocuFormData] = useState({
    datum: "",
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
    setDocuFormData((prevData) => ({
      ...prevData,
      datum: appointmentData.date || "",
      name: clientLastName || "",
      vorname: clientName || "",
    }));
  }, [appointmentData, clientName, clientLastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAppointmentData = {
        ...appointmentData,
        activity: docuFormData.behandlung,
      };

      // Log state before submission
      console.log("Submitting with data:", updatedAppointmentData);

      const appointmentResponse = await createAppointment(
        updatedAppointmentData,
        loginDetails.token
      );
      const appointmentId = appointmentResponse.data.appointmentId;

      if (docuFormData && Object.keys(docuFormData).length > 0) {
        await generateAndUploadDocument(docuFormData, appointmentId);
      }

      handleClose();
      setDocuFormData({});
      setAppointmentData({
        activity: "",
        date: "",
        time: "",
        clientId: clientId || "",
        type: "",
      });
      updateAppointmentList();
    } catch (error) {
      console.error("Error in final submission:", error);
    }
  };

  const generateAndUploadDocument = async (formData, appointmentId) => {
    try {
      const docxFile = await generateDocument(formData, appointmentId);
      await uploadDocument(docxFile, appointmentId);
    } catch (error) {
      console.error("Error in document processing:", error);
      throw error;
    }
  };

  const generateDocument = async (formData, appointmentId) => {
    try {
      const response = await fetch(templateFile);
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData(formData);
      doc.render();

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      return new File(
        [out],
        `Behandlung-${clientName} ${clientLastName} ${appointmentId}.docx`,
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      );
    } catch (error) {
      console.error("Error generating document:", error);
      throw error;
    }
  };

  const uploadDocument = async (docxFile, appointmentId) => {
    try {
      await createAppointmentPdf(
        docxFile,
        "behandlungsformular",
        clientId,
        appointmentId,
        loginDetails.token
      );
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "appointment") {
      setAppointmentData({
        ...appointmentData,
        [name]: value,
      });
    } else {
      setDocuFormData({
        ...docuFormData,
        [name]: value,
      });
    }
  };

  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Termin hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="behandlung">
                <Form.Label>Behandlung</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Behandlung"
                  name="behandlung"
                  value={docuFormData.behandlung}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="type">
                <Form.Label>Art</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={appointmentData.type}
                  onChange={(e) => handleInputChange(e, "appointment")}
                >
                  <option value="">Art auswählen</option>
                  <option value="Consulting">Beratung</option>
                  <option value="Surgery">Operation</option>
                  <option value="Injection">Injektion</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Datum</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={(e) => handleInputChange(e, "appointment")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="time">
                <Form.Label>Zeitpunkt</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={(e) => handleInputChange(e, "appointment")}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={6}>
              <Form.Group controlId="geburtsdatum">
                <Form.Label>Geburtsdatum</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Geburtsdatum"
                  name="geburtsdatum"
                  value={docuFormData.geburtsdatum}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="vorerkrankungen">
                <Form.Label>Vorerkrankungen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vorerkrankungen"
                  name="vorerkrankungen"
                  value={docuFormData.vorerkrankungen}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="vormedikation">
                <Form.Label>Vormedikation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vormedikation"
                  name="vormedikation"
                  value={docuFormData.vormedikation}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="allergie">
                <Form.Label>Allergie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Allergie"
                  name="allergie"
                  value={docuFormData.allergie}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="beschwerden">
                <Form.Label>Beschwerden</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Beschwerden"
                  name="beschwerden"
                  value={docuFormData.beschwerden}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="behandlungswunsch">
                <Form.Label>Behandlungswunsch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Behandlungswunsch"
                  name="behandlungswunsch"
                  value={docuFormData.behandlungswunsch}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="material">
                <Form.Label>Material</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Material"
                  name="material"
                  value={docuFormData.material}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="komplikationen" className="mb-4">
            <Form.Label>Komplikationen</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Komplikationen"
              name="komplikationen"
              value={docuFormData.komplikationen}
              onChange={(e) => handleInputChange(e, "docu")}
            />
          </Form.Group>

          <button onClick={handleClose} className="custom-button-negative">
            Abbrechen
          </button>
          <button className="custom-button float-right" type="submit">
            Termin Speichern
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAppointment;
