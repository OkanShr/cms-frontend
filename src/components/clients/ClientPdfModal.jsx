import React from "react";
import { Modal, Button } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { deleteClientPdf } from "../../api/clientApi";
import { deleteAppointmentPdf } from "../../api/appointmentApi";

const ClientPdfModal = ({
  pdf: file,
  showPdfModal,
  setShowPdfModal,
  clientId,
  loginDetails,
  fetchClientPdfs,
}) => {
  const Hide = () => setShowPdfModal(false);

  const handleDelete = () => {
    if (file.fileName.endsWith(".pdf")) {
      try {
        deleteClientPdf(clientId, file.pdfId, loginDetails.token).then(() => {
          Hide();
          fetchClientPdfs();
        });
      } catch (error) {
        console.log(error);
      }
    } else if (file.fileName.endsWith(".docx")) {
      try {
        deleteAppointmentPdf(
          file.appointmentId,
          file.pdfId,
          loginDetails.token
        ).then(() => {
          Hide();
          fetchClientPdfs();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatPdf(pdf) {
    const formattedDoc = {
      uri: pdf.filePath,
      fileType: pdf.fileName.split(".")[1],
      fileName: pdf.fileName,
    };
    return [formattedDoc]; // Return as an array
  }

  return (
    <Modal show={showPdfModal} onHide={Hide} size="lg" centered>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        <DocViewer
          documents={formatPdf(file)}
          pluginRenderers={DocViewerRenderers}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
        <Button variant="secondary" onClick={Hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
