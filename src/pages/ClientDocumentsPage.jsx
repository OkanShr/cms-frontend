import React, { useEffect, useState } from "react";
import SidebarShort from "../components/SidebarShort";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getClientPdfs } from "../api/clientApi";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import ClientPdfModal from "../components/clients/ClientPdfModal";
import UploadPdfModal from "../components/clients/UploadPdfModal";
import { RotateCcw } from "lucide-react";
import { getAllAppointmentPdfsByClient } from "../api/appointmentApi";

function ClientDocumentsPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false); //For viewing pdf
  const [showPdfUploadModal, setShowPdfUploadModal] = useState(false); //For uploading pdf
  const [currentPdf, setCurrentPdf] = useState(null);
  const loginDetails = useSelector((state) => state.auth.value);
  const [documentFilter, setDocumentFilter] = useState("");

  const fetchClientPdfs = async () => {
    try {
      const [clientPdfsResponse, appointmentPdfsResponse] = await Promise.all([
        getClientPdfs(clientId, loginDetails.token),
        // getAllAppointmentPdfsByClient(clientId, loginDetails.token),
      ]);

      const allPdfs = [
        ...clientPdfsResponse.data,
        // ...appointmentPdfsResponse.data,
      ];

      setPdfs(allPdfs);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.type.toLowerCase().includes(documentFilter.toLowerCase())
  );

  useEffect(() => {
    fetchClientPdfs();
  }, []);

  const handlePdfClick = (pdf) => {
    setCurrentPdf(pdf);
    setShowPdfModal(true);
  };

  return (
    <div className="bg-pink-50 h-screen flex md:flex-row ">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div
        className="flex p-6 bg-white shadow-lg rounded-lg 
                      m-6 flex-col w-full max-h-screen"
      >
        <div className="flex flex-row items-start p-4 w-full">
          <button
            className="mt-2 flex items-start text-pink-500 hover:text-pink-700"
            onClick={() => navigate(`/client/${clientId}`)}
          >
            <ChevronLeft size={42} />
          </button>
          <h1>Patientendokumente</h1>
        </div>

        <button
          className="custom-button"
          onClick={() => {
            setShowPdfUploadModal(true);
            console.log(showPdfUploadModal);
          }}
        >
          Dokument hochladen
        </button>
        <h3 className="m-3">Filtern: </h3>
        <div className="flex flex-row gap-2 mb-4">
          <button
            className="custom-button"
            onClick={() => setDocumentFilter("datenschutz")}
          >
            Datenschutz
          </button>
          <button
            className="custom-button"
            onClick={() => setDocumentFilter("aufnahmeformular")}
          >
            Aufnahmeformular
          </button>
          <button
            className="custom-button"
            onClick={() => setDocumentFilter("behandlungsformular")}
          >
            Behandlungsformular
          </button>
          <button
            className="custom-button"
            onClick={() => setDocumentFilter("opbericht")}
          >
            OP Bericht
          </button>
          <button
            className="custom-button"
            onClick={() => setDocumentFilter("sonstige")}
          >
            Sonstige
          </button>
          <RotateCcw
            className="shadow-md shadow-pink-700 text-dark bg-gradient-to-tr from-pink-200 to-pink-100 border-white m-1 p-1.5 rounded-xl
            hover:bg-gradient-to-tr hover:from-pink-300 hover:to-pink-200"
            size={38}
            color="#831843"
            onClick={() => setDocumentFilter("")}
          />
        </div>
        <h2 className="ml-3">Dokumente</h2>
        <div className="p-4 m-1 bg-pink-50 rounded-lg overflow-auto flex-1 max-h-50">
          <ListGroup className="m-2 gap-2">
            {filteredPdfs.length > 0 ? (
              // Sort by uploadDate in descending order (newest first)
              filteredPdfs
                .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                .map((pdf) => (
                  <div
                    key={pdf.pdfId}
                    className="flex flex-row shadow-md p-3 justify-between items-center bg-white"
                  >
                    <span>{`${pdf.fileName.split("T")[0]} | ${
                      pdf.uploadDate.split("T")[0]
                    }`}</span>
                    <button
                      className="custom-button"
                      onClick={() => handlePdfClick(pdf)}
                    >
                      Öffnen
                    </button>
                  </div>
                ))
            ) : (
              <h4>Keine Dokumente gefunden</h4>
            )}
          </ListGroup>
        </div>

        {currentPdf && (
          <ClientPdfModal
            showPdfModal={showPdfModal}
            setShowPdfModal={setShowPdfModal}
            pdf={currentPdf}
            clientId={clientId}
            loginDetails={loginDetails}
            fetchClientPdfs={fetchClientPdfs}
          />
        )}
        <UploadPdfModal
          showPdfUploadModal={showPdfUploadModal}
          setShowPdfUploadModal={setShowPdfUploadModal}
          clientId={clientId}
          loginDetails={loginDetails}
          fetchClientPdfs={fetchClientPdfs}
        />
      </div>
    </div>
  );
}

export default ClientDocumentsPage;
