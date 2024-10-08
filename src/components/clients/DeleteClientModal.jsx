import React from "react";
import { Modal } from "react-bootstrap";

const DeleteClientModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-dialog-centered"
    >
      <Modal.Header>
        <Modal.Title className="w-full d-flex justify-content-center">
          Möchten Sie den Client wirklich löschen?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-flex justify-content-center">
        <button className="custom-button" onClick={handleClose}>
          Abbrechen
        </button>
        <button className="custom-button-negative" onClick={handleDelete}>
          Löschen
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteClientModal;
