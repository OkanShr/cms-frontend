import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Nav } from "react-bootstrap";
import {
  createAppointment,
  createAppointmentDoc,
} from "../../api/appointmentApi";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import templateFile from "../../assets/bhf_template.docx";
import templateFileOP from "../../assets/op_bericht_template.docx"; // New OP Bericht template

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
  const timeNow = new Date().toISOString();

  const [activeTab, setActiveTab] = useState("behandlungsformular"); // Tab state
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

  const [opBerichtData, setOpBerichtData] = useState({
    name: clientLastName || "",
    vorname: clientName || "",
    geburtsdatum: clientBirthDate || "",
    diagnose: "",
    stadium: "",
    operation: "",
    vorgeschichte: "",
    operationsbeschreibung: "",
  });

  const resetFormData = () => {
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

    setOpBerichtData({
      name: clientLastName || "",
      vorname: clientName || "",
      geburtsdatum: clientBirthDate || "",
      diagnose: "",
      stadium: "",
      operation: "",
      vorgeschichte: "",
      operationsbeschreibung: "",
    });

    setAppointmentData({
      activity: "",
      date: new Date().toISOString().split("T")[0], // Reset to current date
      time: "",
      clientId: clientId || "",
      type: "",
    });
  };

  useEffect(() => {
    setDocuFormData((prevData) => ({
      ...prevData,
      datum: appointmentData.date || "",
      name: clientLastName || "",
      vorname: clientName || "",
      geburtsdatum: clientBirthDate || "",
    }));
    setOpBerichtData((prevData) => ({
      ...prevData,
      datum: appointmentData.date || "",
      name: clientLastName || "",
      vorname: clientName || "",
      geburtsdatum: clientBirthDate || "",
    }));
    const timeNow = new Date().toISOString();
    console.log(timeNow);
  }, [appointmentData, clientName, clientLastName, clientBirthDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If the active tab is "opbericht", set type and activity to "Operation"
      let updatedAppointmentData = { ...appointmentData };
      if (activeTab === "opbericht") {
        updatedAppointmentData = {
          ...appointmentData,
          type: "Operation",
          activity: "Operation",
        };
      } else {
        updatedAppointmentData = {
          ...appointmentData,
          activity: appointmentData.type,
        };
      }

      const appointmentResponse = await createAppointment(
        updatedAppointmentData,
        loginDetails.token
      );
      const appointmentId = appointmentResponse.data.appointmentId;

      if (activeTab === "behandlungsformular" && docuFormData) {
        await generateAndUploadDocument(
          docuFormData,
          appointmentId,
          "behandlungsformular"
        );
      } else if (activeTab === "opbericht" && opBerichtData) {
        await generateAndUploadDocument(
          opBerichtData,
          appointmentId,
          "opbericht"
        );
      }

      handleClose();
      resetFormData(); // Reset forms after submission
      updateAppointmentList();
    } catch (error) {
      console.error("Error in final submission:", error);
    }
  };

  const generateAndUploadDocument = async (
    formData,
    appointmentId,
    formType
  ) => {
    try {
      const docxFile = await generateDocument(formData, formType);
      await uploadDocument(docxFile, appointmentId, formType);
    } catch (error) {
      console.error("Error in document processing:", error);
      throw error;
    }
  };

  const generateDocument = async (formData, formType, appointmentId) => {
    try {
      // Prepare the data for boolean values as "Ja" or "Nein"
      const documentData = {
        ...formData,
        komplikationen: formData.komplikationen ? "Ja" : "Nein",
        gpkontrolle: formData.gpkontrolle ? "Ja" : "Nein",
        gpfolgetherapie: formData.gpfolgetherapie ? "Ja" : "Nein",
      };

      const template =
        formType === "behandlungsformular" ? templateFile : templateFileOP;
      const response = await fetch(template);
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
        `${
          formType === "behandlungsformular" ? "Behandlung" : "OP-Bericht"
        }-${clientName} ${clientLastName} ${timeNow}.docx`,
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      );
    } catch (error) {
      console.error("Error generating document:", error);
      throw error;
    }
  };

  const uploadDocument = async (docxFile, appointmentId, formType) => {
    try {
      await createAppointmentDoc(
        docxFile,
        formType,
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
    } else if (formType === "docu") {
      setDocuFormData({
        ...docuFormData,
        [name]: inputValue,
      });
    } else if (formType === "opbericht") {
      setOpBerichtData({
        ...opBerichtData,
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
        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
        >
          <Nav.Item>
            <Nav.Link eventKey="behandlungsformular">
              Behandlungsformular
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="opbericht">OP Bericht</Nav.Link>
          </Nav.Item>
        </Nav>
        <Form onSubmit={handleSubmit}>
          {activeTab === "behandlungsformular" && (
            <>
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
                      <option value="Husein Kechagia">
                        Chousein Kechagia{" "}
                      </option>
                      <option value="Menekse Kechagia">
                        Menekse Kechagia{" "}
                      </option>
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
            </>
          )}

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
          {activeTab === "behandlungsformular" && (
            <>
              {/* Behandlungsformular Form */}

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
            </>
          )}

          {activeTab === "opbericht" && (
            <>
              {/* OP Bericht Form */}
              <Form.Group controlId="diagnose">
                <Form.Label>Diagnose</Form.Label>
                <Form.Control
                  type="text"
                  name="diagnose"
                  value={opBerichtData.diagnose}
                  onChange={(e) => handleInputChange(e, "opbericht")}
                />
              </Form.Group>

              <Form.Group controlId="stadium">
                <Form.Label>Stadium</Form.Label>
                <Form.Control
                  type="text"
                  name="stadium"
                  value={opBerichtData.stadium}
                  onChange={(e) => handleInputChange(e, "opbericht")}
                />
              </Form.Group>

              <Form.Group controlId="operation">
                <Form.Label>Operation</Form.Label>
                <Form.Control
                  type="text"
                  name="operation"
                  value={opBerichtData.operation}
                  onChange={(e) => handleInputChange(e, "opbericht")}
                />
              </Form.Group>

              <Form.Group controlId="vorgeschichte">
                <Form.Label>Vorgeschichte</Form.Label>
                <Form.Control
                  as="textarea"
                  name="vorgeschichte"
                  value={opBerichtData.vorgeschichte}
                  onChange={(e) => handleInputChange(e, "opbericht")}
                />
              </Form.Group>

              <Form.Group controlId="operationsbeschreibung">
                <Form.Label>Operationsbeschreibung</Form.Label>
                <Form.Control
                  as="textarea"
                  name="operationsbeschreibung"
                  value={opBerichtData.operationsbeschreibung}
                  onChange={(e) => handleInputChange(e, "opbericht")}
                />
              </Form.Group>
            </>
          )}

          <Form.Group>
            <button type="submit" className="custom-button float-right">
              Speichern
            </button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAppointment;
