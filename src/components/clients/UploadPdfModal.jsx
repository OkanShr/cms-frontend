import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { uploadClientPdf } from "../../api/clientApi";

const UploadPdfModal = ({
  showPdfUploadModal,
  setShowPdfUploadModal,
  clientId,
  loginDetails,
  fetchClientPdfs,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  // Function to handle PDF file change
  const handlePdfFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle PDF file upload
  const handleFileUpload = () => {
    if (!selectedFile || !clientId || !loginDetails.token) {
      console.error("File, client ID, or token missing");
      return;
    }

    uploadClientPdf(clientId, selectedFile, loginDetails.token)
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
        <Modal.Title>Upload Pdf</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" onChange={handlePdfFileChange} />
        <Button onClick={handleFileUpload}>Upload</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowPdfUploadModal(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadPdfModal;
