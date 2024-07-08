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
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full mx-auto">
        <Modal.Header className="flex justify-between items-center border-b p-4">
          <Modal.Title className="text-lg font-semibold">
            Upload Client Image
          </Modal.Title>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowImageUploadModal(false)}
          >
            &times;
          </button>
        </Modal.Header>
        <Modal.Body className="p-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleImageUpload}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload Image
          </button>
        </Modal.Body>
        <Modal.Footer className="flex justify-end border-t p-4">
          <Button
            variant="secondary"
            onClick={() => setShowImageUploadModal(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
