import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import {
  createAppointment,
  createAppointmentPdf,
} from "../../api/appointmentApi";
import { AppointmentForm } from "../forms/AppointmentForm";
import { BehandlungsForm } from "../forms/BehandlungsForm";
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
  const [activeTab, setActiveTab] = useState("appointmentInfo");
  const [appointmentData, setAppointmentData] = useState({});
  const [docuFormData, setDocuFormData] = useState({});

  const handleNext = (data) => {
    setAppointmentData(data);
    setActiveTab("behandlungsForm");
  };

  const handleDocuDataChange = (data) => {
    setDocuFormData(data);
  };

  const handleFinalSubmit = async () => {
    try {
      const appointmentResponse = await createAppointment(
        appointmentData,
        loginDetails.token
      );
      const appointmentId = appointmentResponse.data.appointmentId;

      if (docuFormData && Object.keys(docuFormData).length > 0) {
        await generateAndUploadDocument(docuFormData, appointmentId);
      }

      handleClose();
      setDocuFormData({});
      setActiveTab("appointmentInfo");
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

  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Termin hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab
            className="mx-3 mt-3"
            title="Termin Info"
            eventKey="appointmentInfo"
          >
            <AppointmentForm
              onNext={handleNext}
              clientId={clientId}
              handleClose={handleClose}
            />
          </Tab>
          <Tab
            className="mx-3 mt-3"
            title="Behandlungsformular"
            eventKey="behandlungsForm"
          >
            <BehandlungsForm
              clientName={clientName}
              clientLastName={clientLastName}
              appointmentData={appointmentData}
              onDocuDataChange={handleDocuDataChange}
              onFinalSubmit={handleFinalSubmit}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AddAppointment;
