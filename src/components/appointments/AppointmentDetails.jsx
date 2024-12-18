import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteAppointment, getAppointmentPdf } from "../../api/appointmentApi";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Document, Page } from "react-pdf";
import "../modal.css";

const AppointmentDetails = ({
  updateAppointmentList,
  loginDetails,
  appointment,
  showDetailsModal,
  handleClose,
  setShowDetailsModal,
  setShowEditModal,
  clientId,
  clientName,
  clientLastName,
}) => {
  const [appointmentPdf, setAppointmentPdf] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (appointment.id && showDetailsModal) {
      fetchAppointmentPdf(appointment.id);
    }
  }, [appointment.id, showDetailsModal]);

  const fetchAppointmentPdf = async (appointmentId) => {
    try {
      const response = await getAppointmentPdf(
        appointmentId,
        clientId,
        loginDetails.token
      );

      setAppointmentPdf(response.data[0]);

      const filename = response.data[0].fileName;

      // Use lastIndexOf to extract the file extension correctly
      const fileExtension = filename.substring(filename.lastIndexOf(".") + 1);

      setFileType(fileExtension);
    } catch (error) {
      console.error("Error fetching pdf:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(appointment.id, clientId, loginDetails.token);
      handleClose();
      updateAppointmentList();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleOpenEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  function formatPdf(pdf) {
    const formattedDoc = {
      uri: pdf.filePath,
      fileType: pdf.fileName.substring(pdf.fileName.lastIndexOf(".") + 1),
      fileName: pdf.fileName,
    };
    return [formattedDoc];
  }

  return (
    <Modal
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      dialogClassName="w-9/12"
    >
      <Modal.Header>
        <Modal.Title>
          Termin Details - {clientName} {clientLastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Thema: {appointment.activity}</p>
        <p>Datum: {appointment.date.split("T")[0]}</p>
        <p>Zeitpunkt: {appointment.time}</p>
        {appointmentPdf && (
          <div className="doc-viewer-container">
            {fileType === "pdf" ? (
              <Document
                file={appointmentPdf.filePath}
                options={{ disableTextLayer: true, disableAnnotations: true }}
              >
                <Page pageNumber={1} />
              </Document>
            ) : (
              <DocViewer
                documents={formatPdf(appointmentPdf)}
                pluginRenderers={DocViewerRenderers}
              />
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="custom-button"
          onClick={() => setShowDetailsModal(false)}
        >
          Zurück
        </button>
        <button className="custom-button" onClick={handleOpenEdit}>
          Termin bearbeiten
        </button>
        <button className="custom-button" onClick={handleDelete}>
          Termin löschen
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetails;
