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
        <Modal.Title>Upload PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Upload PDF</Form.Label>
            <Form.Control type="file" onChange={handlePdfFileChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Type</Form.Label>
            <Form.Control as="select" value={type} onChange={handleTypeChange}>
              <option value="">Select type</option>
              <option value="behandlungsformular">Behandlungsformular</option>
              <option value="aufnahmeformular">Aufnahmeformular</option>
              <option value="datenschutz">Datenschutz</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowPdfUploadModal(false)}
        >
          Cancel
        </Button>
        <Button onClick={handleFileUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadPdfModal;
