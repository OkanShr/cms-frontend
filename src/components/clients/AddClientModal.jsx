import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ClientForm } from "../forms/ClientForm";
import { createClient } from "../../api/clientApi";

const AddClientModal = ({
  showAddClientModal,
  setShowAddClientModal,
  loginDetails,
  updateClientList,
}) => {
  const [error, setError] = useState("");

  const handleFinalSubmit = async (clientData) => {
    try {
      console.log(clientData);

      // Submit the client data
      await createClient(clientData, loginDetails.token);

      console.log("Client created successfully");
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
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Patient Hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <ClientForm onSubmit={handleFinalSubmit} loginDetails={loginDetails} />
      </Modal.Body>
    </Modal>
  );
};

export default AddClientModal;
