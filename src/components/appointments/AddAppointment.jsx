import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { createAppointment } from "../../api/appointmentApi";
import { AppointmentForm } from "../forms/AppointmentForm";
import { BehandlungsForm } from "../forms/BehandlungsForm";
const AddAppointment = ({
  clientId,
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
      if (docuFormData) {
        // create docx file and upload to appointment
        console.log(docuFormData);
      }
      console.log(appointmentResponse.data);
      updateAppointmentList();
    } catch (error) {
      console.error("Error in final submission:", error);
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
