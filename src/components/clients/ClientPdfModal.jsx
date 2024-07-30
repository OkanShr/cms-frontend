import React, { useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { deleteClientPdf } from "../../api/clientApi";
import { deleteAppointmentPdf } from "../../api/appointmentApi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

  const options = useMemo(() => {
    return {
      disableTextLayer: true,
      disableAnnotations: true,
    };
  }, []);

  function formatPdf(pdf) {
    const formattedDoc = {
      uri: pdf.filePath,
      fileType: pdf.fileName.split(".")[1],
      fileName: pdf.fileName,
    };
    return [formattedDoc];
  }

  return (
    <Modal show={showPdfModal} onHide={Hide} size="lg" centered>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        {file.fileName.endsWith(".pdf") ? (
          <Document file={file.filePath} options={options}>
            <Page pageNumber={1} />
          </Document>
        ) : (
          <DocViewer
            documents={formatPdf(file)}
            pluginRenderers={DocViewerRenderers}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}>Delete</Button>
        <Button variant="secondary" onClick={Hide}>
          Schließen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
