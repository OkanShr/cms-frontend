import React, { useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { ClientForm } from "./ClientForm";
import { DocumentForm } from "../forms/DocumentForm";
import { createClient, uploadClientPdf } from "../../api/clientApi";

const AddClientModal = ({
  showAddClientModal,
  setShowAddClientModal,
  loginDetails,
}) => {
  const [activeTab, setActiveTab] = useState("clientInfo");
  const [clientData, setClientData] = useState({});
  const [selectedDSEFile, setSelectedDSEFile] = useState(null);
  const [selectedAFNFile, setSelectedAFNFile] = useState(null);

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
      console.log(clientId);
      console.log(clientResponse.data);
      // if (selectedDSEFile) {
      //   await uploadClientPdf(clientId, selectedDSEFile, loginDetails.token);
      // }
      // if (selectedAFNFile) {
      //   await uploadClientPdf(clientId, selectedAFNFile, loginDetails.token);
      // }

      console.log("Client and PDF uploaded successfully");
      setShowAddClientModal(false);
    } catch (error) {
      console.error("Error in final submission:", error);
    }
  };

  return (
    <Modal
      show={showAddClientModal}
      onHide={() => setShowAddClientModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Tab className="mx-3 mt-3" title="Client Info" eventKey="clientInfo">
            <ClientForm onNext={handleNext} />
          </Tab>
          <Tab className="mx-3 mt-3" title="Documents" eventKey="documents">
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
