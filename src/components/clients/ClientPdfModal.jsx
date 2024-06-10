import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { deleteClientPdf } from "../../api/clientApi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ClientPdfModal = ({
  pdf,
  showPdfModal,
  setShowPdfModal,
  clientId,
  loginDetails,
  fetchClientPdfs,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const Hide = () => setShowPdfModal(false);

  const handleDelete = () => {
    try {
      deleteClientPdf(clientId, pdf.id, loginDetails.token).then(() => {
        Hide();
        fetchClientPdfs();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showPdfModal} onHide={Hide} size="lg" centered>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        <Document file={pdf.filePath} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            size={"A4"}
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        <div className="text-center">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={Hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
