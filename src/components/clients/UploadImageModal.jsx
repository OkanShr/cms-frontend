import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { uploadClientImage } from "../../api/clientApi";
const UploadImageModal = ({
  setShowImageUploadModal,
  showImageUploadModal,
  loginDetails,
  clientId,
  fetchClientImages,
}) => {
  const [file, setFile] = useState(null);

  // Function to handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle image upload
  const handleImageUpload = () => {
    if (!file || !clientId || !loginDetails.token) {
      console.error("File, client ID, or token missing");
      return;
    }

    uploadClientImage(clientId, file, loginDetails.token)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setShowImageUploadModal(false);
        fetchClientImages();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <Modal
      show={showImageUploadModal}
      onHide={() => setShowImageUploadModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to delete the client?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowImageUploadModal(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadImageModal;
