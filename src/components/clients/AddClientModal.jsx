import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { ClientForm } from "../forms/ClientForm";
import { DocumentForm } from "../forms/DocumentForm";
import { createClient, uploadClientPdf } from "../../api/clientApi";

const AddClientModal = ({
  showAddClientModal,
  setShowAddClientModal,
  loginDetails,
  updateClientList,
}) => {
  const [activeTab, setActiveTab] = useState("clientInfo");
  const [clientData, setClientData] = useState({});
  const [selectedDSEFile, setSelectedDSEFile] = useState(null);
  const [selectedAFNFile, setSelectedAFNFile] = useState(null);
  const [error, setError] = useState("");
  const handleNext = (data) => {
    setClientData(data);
    setActiveTab("documents");
  };

  const handleDSEFileChange = (file) => {
    setSelectedDSEFile(file);
  };
  const handleAFNFileChange = (file) => {
    setSelectedAFNFile(file);
  };

  const handleFinalSubmit = async () => {
    try {
      const clientResponse = await createClient(clientData, loginDetails.token);
      const clientId = clientResponse.data.clientId;
      if (selectedDSEFile) {
        await uploadClientPdf(
          clientId,
          selectedDSEFile,
          "datenschutz",
          loginDetails.token
        );
      }
      if (selectedAFNFile) {
        await uploadClientPdf(
          clientId,
          selectedAFNFile,
          "aufnahmeformular",
          loginDetails.token
        );
      }

      console.log("Client and PDF uploaded successfully");
      setShowAddClientModal(false);
      updateClientList();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal
      show={showAddClientModal}
      onHide={() => {
        setShowAddClientModal(false);
        setError("");
        setActiveTab("clientInfo");
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Patient Hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab
            className="mx-3 mt-3"
            title="Kundendetails"
            eventKey="clientInfo"
          >
            <ClientForm onNext={handleNext} loginDetails={loginDetails} />
          </Tab>
          <Tab className="mx-3 mt-3" title="Dokumente" eventKey="documents">
            {error && <div className="alert alert-danger">{error}</div>}

            <DocumentForm
              onDSEFileChange={handleDSEFileChange}
              onAFNFileChange={handleAFNFileChange}
              onFinalSubmit={handleFinalSubmit}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AddClientModal;
