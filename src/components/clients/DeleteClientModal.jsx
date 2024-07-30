import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteClientModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Möchten Sie den Client wirklich löschen?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Abbrechen
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Löschen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteClientModal;
