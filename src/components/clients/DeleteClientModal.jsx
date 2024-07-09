import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteClientModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Are you sure you want to delete the client?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteClientModal;
