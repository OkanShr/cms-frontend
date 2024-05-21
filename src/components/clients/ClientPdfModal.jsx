import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ClientPdfModal = ({ pdf, showPdfModal, setShowPdfModal }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const onHide = () => setShowPdfModal(false);

  return (
    <Modal show={showPdfModal} onHide={onHide} size="lg" centered>
      <Modal.Body style={{ height: "80vh", overflow: "auto" }}>
        <Document file={pdf.pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientPdfModal;
