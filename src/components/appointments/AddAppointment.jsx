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
import { saveAs } from "file-saver";
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
  const [appointmentRequest, setAppointmentRequest] = useState({
    file: {},
    type: appointmentData.type ? appointmentData.type : "Default",
  });

  const handleNext = (data) => {
    setAppointmentData(data);
    setActiveTab("behandlungsForm");
  };

  const handleDocuDataChange = (data) => {
    setDocuFormData(data);
    console.log(docuFormData);
  };

  const handleFinalSubmit = async () => {
    try {
      const appointmentResponse = await createAppointment(
        appointmentData,
        loginDetails.token
      );
      const appointmentId = appointmentResponse.data.appointmentId;
      if (docuFormData) {
        generateDocument(docuFormData, appointmentId);
        // create docx file and upload to appointment
        console.log(docuFormData);
      }
      console.log(appointmentResponse.data);
      updateAppointmentList();
    } catch (error) {
      console.error("Error in final submission:", error);
    }
  };

  const generateDocument = async (formData, appointmentId, type) => {
    try {
      // Fetch the template file
      const response = await fetch(templateFile);
      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Replace placeholders with form data
      doc.setData(formData);

      // Render the document
      try {
        doc.render();
      } catch (error) {
        console.error("Error rendering document:", error);
        throw error;
      }

      // Generate the document blob
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Create a File object from the Blob
      const docxFile = new File(
        [out],
        `Behandlung-${formData.clientName}${formData.clientLastName}${formData.date}.docx`,
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      );

      console.log(docxFile, appointmentId, loginDetails.token);
      try {
        // Pass the File object and type to createAppointmentPdf
        await createAppointmentPdf(
          docxFile,
          type,
          appointmentId,
          loginDetails.token
        );
      } catch (error) {
        console.log("Error uploading appointment PDF", error);
      }
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header>Add Appointment</Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab
            className="mx-3 mt-3"
            title="Appointment Info"
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
            <h1>Hello</h1>
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
