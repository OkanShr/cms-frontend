import React, { useEffect, useState } from "react";
import SidebarShort from "../components/SidebarShort";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getClientPdfs } from "../api/clientApi";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
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
        getAllAppointmentPdfsByClient(clientId, loginDetails.token),
      ]);

      const allPdfs = [
        ...clientPdfsResponse.data,
        ...appointmentPdfsResponse.data,
      ];

      setPdfs(allPdfs);
      console.log(clientPdfsResponse.data);
      console.log(allPdfs);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.type.toLowerCase().includes(documentFilter.toLowerCase())
  );

  useEffect(() => {
    fetchClientPdfs();
    console.log(pdfs);
  }, []);

  const handlePdfClick = (pdf) => {
    setCurrentPdf(pdf);
    setShowPdfModal(true);
  };

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-start p-5 w-full">
          <button
            onClick={() => navigate(`/client/${clientId}`)}
            className="mr-3"
          >
            <ChevronLeft size={35} />
          </button>
          <h2>Client Documents</h2>
        </div>
        <div className="flex flex-row">
          <RotateCcw
            size={38}
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-3 p-1.5 rounded-xl"
            onClick={() => setDocumentFilter("")}
          />
          <Button
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-45 m-3"
            onClick={() => setDocumentFilter("datenschutz")}
          >
            Datenschutz
          </Button>
          <Button
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-45 m-3"
            onClick={() => setDocumentFilter("aufnahmeformular")}
          >
            Aufnahmeformular
          </Button>
          <Button
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-45 m-3"
            onClick={() => setDocumentFilter("behandlungsformular")}
          >
            Behandlungsformular
          </Button>
        </div>
        <Button
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-40 m-3"
          onClick={() => {
            setShowPdfUploadModal(true);
            console.log(showPdfUploadModal);
          }}
        >
          Upload Document
        </Button>
        <ListGroup className="m-3 w-6/12">
          {filteredPdfs.length > 0 ? (
            filteredPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="flex flex-row shadow-md p-3 justify-between items-center"
              >
                <span>{`${pdf.fileName} | Upload Date`}</span>
                <Button
                  className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white"
                  onClick={() => handlePdfClick(pdf)}
                >
                  Read
                </Button>
              </div>
            ))
          ) : (
            <h4>No Documents Found</h4>
          )}
        </ListGroup>
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
