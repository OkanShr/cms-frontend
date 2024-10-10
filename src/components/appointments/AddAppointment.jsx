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
  clientBirthDate,
  loginDetails,
  showAddModal,
  handleClose,
  updateAppointmentList,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    activity: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    clientId: clientId || "",
    type: "",
  });
  const [docuFormData, setDocuFormData] = useState({
    doctor: "",
    datum: "",
    name: clientLastName || "",
    vorname: clientName || "",
    geburtsdatum: clientBirthDate || "",
    vorerkrankungen: "",
    vormedikation: "",
    allergie: "",
    wunsch: "",
    behandlung: "",
    material: "",
    komplikationen: false,
    kpnote: "", // Notiz for "Komplikationen"
    gpkontrolle: false,
    gpkdatum: "", // Datum for "Kontrolle Geplant?"
    gpfolgetherapie: false,
    gpfdatum: "", // Datum for "Folgetherapie Geplant?"
  });

  useEffect(() => {
    setDocuFormData((prevData) => ({
      ...prevData,
      datum: appointmentData.date || "",
      name: clientLastName || "",
      vorname: clientName || "",
      geburtsdatum: clientBirthDate || "",
    }));
  }, [appointmentData, clientName, clientLastName, clientBirthDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAppointmentData = {
        ...appointmentData,
        activity: appointmentData.type,
      };

      const appointmentResponse = await createAppointment(
        updatedAppointmentData,
        loginDetails.token
      );
      const appointmentId = appointmentResponse.data.appointmentId;

      if (docuFormData && Object.keys(docuFormData).length > 0) {
        await generateAndUploadDocument(docuFormData, appointmentId);
      }

      handleClose();
      setDocuFormData({
        doctor: "",
        datum: "",
        name: clientLastName || "",
        vorname: clientName || "",
        geburtsdatum: clientBirthDate || "",
        vorerkrankungen: "",
        vormedikation: "",
        allergie: "",
        wunsch: "",
        behandlung: "",
        material: "",
        komplikationen: false,
        kpnote: "", // Notiz for "Komplikationen"
        gpkontrolle: false,
        gpkdatum: "", // Datum for "Kontrolle Geplant?"
        gpfolgetherapie: false,
        gpfdatum: "", // Datum for "Folgetherapie Geplant?"
      });
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
      // Prepare the data for boolean values as "Ja" or "Nein"
      const documentData = {
        ...formData,
        komplikationen: formData.komplikationen ? "Ja" : "Nein",
        gpkontrolle: formData.gpkontrolle ? "Ja" : "Nein",
        gpfolgetherapie: formData.gpfolgetherapie ? "Ja" : "Nein",
      };

      const response = await fetch(templateFile);
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData(documentData);
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
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    if (formType === "appointment") {
      setAppointmentData({
        ...appointmentData,
        [name]: inputValue,
      });
    } else {
      setDocuFormData({
        ...docuFormData,
        [name]: inputValue,
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
              <Form.Group controlId="doctor">
                <Form.Label>Arzt/Ärztin</Form.Label>
                <Form.Control
                  as="select"
                  name="doctor"
                  value={docuFormData.doctor}
                  onChange={(e) => handleInputChange(e, "docu")}
                >
                  <option value="">Arzt/Ärztin auswählen</option>
                  <option value="Husein Kechagia">Chousein Kechagia </option>
                  <option value="Menekse Kechagia">Menekse Kechagia </option>
                </Form.Control>
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
                  <option value="Beratung">Beratung</option>
                  <option value="Laser">Laser</option>
                  <option value="Injektion">Injektion</option>
                  <option value="Operation">Operation</option>
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
                <Form.Label>Uhrzeit</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={(e) => handleInputChange(e, "appointment")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="allergie">
                <Form.Label>Allergie</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Allergie"
                  name="allergie"
                  value={docuFormData.allergie}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="wunsch">
                <Form.Label>Diagnose/Behandlungswunsch</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Diagnose/Behandlungswunsch"
                  name="wunsch"
                  value={docuFormData.wunsch}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="behandlung">
            <Form.Label>Durchgeführte Behandlung</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Durchgeführte Behandlung"
              name="behandlung"
              value={docuFormData.behandlung}
              onChange={(e) => handleInputChange(e, "docu")}
            />
          </Form.Group>

          <Form.Group controlId="material">
            <Form.Label>Verwendetes Material</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Verwendetes Material"
              name="material"
              value={docuFormData.material}
              onChange={(e) => handleInputChange(e, "docu")}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="komplikationen">
                <Form.Check
                  type="checkbox"
                  label="Traten Komplikationen auf?"
                  name="komplikationen"
                  checked={docuFormData.komplikationen}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
                <Form.Control
                  type="text"
                  placeholder="Notiz"
                  name="kpnote"
                  value={docuFormData.kpnote}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="gpkontrolle">
                <Form.Check
                  type="checkbox"
                  label="Kontrolle Geplant?"
                  name="gpkontrolle"
                  checked={docuFormData.gpkontrolle}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
                <Form.Control
                  type="date"
                  placeholder="Datum"
                  name="gpkdatum"
                  value={docuFormData.gpkdatum}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="gpfolgetherapie">
                <Form.Check
                  type="checkbox"
                  label="Folgetherapie Geplant?"
                  name="gpfolgetherapie"
                  checked={docuFormData.gpfolgetherapie}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
                <Form.Control
                  type="date"
                  placeholder="Datum"
                  name="gpfdatum"
                  value={docuFormData.gpfdatum}
                  onChange={(e) => handleInputChange(e, "docu")}
                />
              </Form.Group>
            </Col>
          </Row>

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
