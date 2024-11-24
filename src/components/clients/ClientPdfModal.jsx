import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { deleteClientPdf } from "../../api/clientApi";
import { deleteAppointmentPdf } from "../../api/appointmentApi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { classNames } from "@react-pdf-viewer/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ClientPdfModal = ({
  pdf: file,
  showPdfModal,
  setShowPdfModal,
  clientId,
  loginDetails,
  fetchClientPdfs,
}) => {
  const [numPages, setNumPages] = useState(null);

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Modal show={showPdfModal} onHide={Hide} size="lg" centered>
      <Modal.Body
        className="flex"
        style={{ height: "80vh", overflowY: "auto", padding: "0" }}
      >
        {file.fileName.endsWith(".pdf") ? (
          <Document
            file={file.filePath}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-document"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={1000} // Adjusts page width dynamically.
                className="pdf-page"
              />
            ))}
          </Document>
        ) : (
          <DocViewer
            documents={formatPdf(file)}
            pluginRenderers={DocViewerRenderers}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <a
          href={file.filePath}
          download={file.fileName}
          className="custom-button"
          style={{ marginRight: "auto" }}
        >
          Download
        </a>{" "}
        <button onClick={handleDelete} className="custom-button-negative">
          Delete
        </button>
        <button className="custom-button" onClick={Hide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
