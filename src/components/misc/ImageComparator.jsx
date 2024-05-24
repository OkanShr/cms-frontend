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
        <Modal.Title className="text-center">Before - After</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Slider firstImage={firstImage} secondImage={secondImage} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowComparatorModal(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageComparator;
