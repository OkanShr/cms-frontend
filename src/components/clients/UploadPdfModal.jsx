import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { uploadClientPdf } from "../../api/clientApi";

const UploadPdfModal = ({
  showPdfUploadModal,
  setShowPdfUploadModal,
  clientId,
  loginDetails,
  fetchClientPdfs,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState("");

  const handlePdfFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !type || !clientId || !loginDetails.token) {
      console.error("File, file type, client ID, or token missing");
      return;
    }

    uploadClientPdf(clientId, selectedFile, type, loginDetails.token)
      .then((response) => {
        console.log("PDF uploaded successfully:", response.data);
        setShowPdfUploadModal(false);
        fetchClientPdfs();
      })
      .catch((error) => {
        console.error("Error uploading PDF:", error);
      });
  };

  return (
    <Modal
      show={showPdfUploadModal}
      onHide={() => setShowPdfUploadModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>PDF hochladen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Behandlungsart auswählen</Form.Label>
            <Form.Control as="select" value={type} onChange={handleTypeChange}>
              <option value="">Art auswählen</option>
              <option value="behandlungsformular">Behandlungsformular</option>
              <option value="aufnahmeformular">Aufnahmeformular</option>
              <option value="opbericht">OP Bericht</option>
              <option value="sonstige">Sonstige</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>PDF hochladen</Form.Label>
            <Form.Control type="file" onChange={handlePdfFileChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="custom-button"
          onClick={() => setShowPdfUploadModal(false)}
        >
          Abbrechen
        </button>
        <button className="custom-button" onClick={handleFileUpload}>
          Hochladen
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadPdfModal;
