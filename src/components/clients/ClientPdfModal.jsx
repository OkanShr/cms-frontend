import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
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
  {
    console.log(file);
  }
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
          clientId,
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
      fileType: pdf.fileName.substring(pdf.fileName.lastIndexOf(".") + 1),
      fileName: pdf.fileName,
    };
    return [formattedDoc];
  }

  return (
    <Modal show={showPdfModal} onHide={Hide} size="lg" centered>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        {file.fileName.endsWith(".pdf") ? (
          <Document file={file.filePath} options={options}>
            <Page />
          </Document>
        ) : (
          <DocViewer
            documents={formatPdf(file)}
            pluginRenderers={DocViewerRenderers}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleDelete} className="custom-button-negative">
          Delete
        </button>
        <button className="custom-button" onClick={Hide}>
          Schließen
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
