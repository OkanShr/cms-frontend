import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Slider } from "./Slider";

const ImageComparator = ({
  firstImage,
  secondImage,
  showComparatorModal,
  setShowComparatorModal,
}) => {
  return (
    <Modal
      show={showComparatorModal}
      onHide={() => setShowComparatorModal(false)}
    >
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title className="text-center">Vorher - Nachher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Slider firstImage={firstImage} secondImage={secondImage} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowComparatorModal(false)}
        >
          Zurück
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageComparator;
