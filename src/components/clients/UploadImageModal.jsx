import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { uploadClientImage } from "../../api/clientApi";

const UploadImageModal = ({
  setShowImageUploadModal,
  showImageUploadModal,
  loginDetails,
  clientId,
  fetchClientImages,
}) => {
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);
  const [preview, setPreview] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select a valid image file.");
      setFile(null);
      setPreview(null);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
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

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Modal
      show={showImageUploadModal}
      onHide={() => setShowImageUploadModal(false)}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full mx-auto">
        <Modal.Header className="flex justify-between items-center border-b p-4">
          <Modal.Title className="text-lg font-semibold">
            Bild hochladen
          </Modal.Title>
          <button
            className="custom-button"
            onClick={() => setShowImageUploadModal(false)}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body className="p-4">
          <button className="button-upload custom-button" onClick={handleClick}>
            Datei wählen
          </button>
          <input
            className="hidden"
            type="file"
            onChange={handleFileChange}
            ref={hiddenFileInput}
            accept="image/*"
          />

          <button
            onClick={handleImageUpload}
            className="custom-button mt-4"
            disabled={!file}
          >
            Bild hochladen
          </button>
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Image preview"
                className="w-full h-auto object-contain rounded-md border"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end border-t p-4">
          <button
            variant="secondary"
            onClick={() => setShowImageUploadModal(false)}
            className="custom-button"
          >
            Abbrechen
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
