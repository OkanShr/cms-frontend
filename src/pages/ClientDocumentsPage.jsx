import React, { useEffect, useState } from "react";
import SidebarShort from "../components/SidebarShort";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getClientPdfs, uploadClientPdf } from "../api/clientApi";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import ClientPdfModal from "../components/clients/ClientPdfModal";
import UploadPdfModal from "../components/clients/UploadPdfModal";
function ClientDocumentsPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false); //For viewing pdf
  const [showPdfUploadModal, setShowPdfUploadModal] = useState(false); //For uploading pdf
  const [currentPdf, setCurrentPdf] = useState(null);
  const loginDetails = useSelector((state) => state.auth.value);

  const fetchClientPdfs = () => {
    getClientPdfs(clientId, loginDetails.token)
      .then((response) => {
        setPdfs(response.data);
        console.log(pdfs);
      })
      .catch((error) => {
        console.error("Error fetching client PDFs:", error);
      });
  };

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
          {pdfs.length > 0 ? (
            pdfs.map((pdf) => (
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
