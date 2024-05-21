import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { ChevronLeft } from "lucide-react";
import SidebarShort from "../components/SidebarShort";
import Appointments from "../components/appointments/Appointments";
import { deleteClient, getClientById } from "../api/clientApi";
import DeleteClientModal from "../components/clients/DeleteClientModal";

function ClientDetailsPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();

  useEffect(() => {
    getClientById(clientId, loginDetails.token)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
      });
  }, [clientId, loginDetails.token]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleDelete = () => {
    deleteClient(client.id, loginDetails.token)
      .then(() => {
        handleCloseModal();
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };

  const renderClientDetails = () => {
    if (!client) {
      return <div>Client Not Found</div>;
    }

    return (
      <div className="flex flex-col p-5 w-full">
        <div className="flex flex-row">
          <button onClick={() => navigate("/clients")}>
            <ChevronLeft size={35} />
          </button>
          <h2>Client Details</h2>
        </div>

        <span>Vorname: {client.firstName}</span>
        <span>Nachname: {client.lastName}</span>
        <span>Telefon Nummer: {client.phoneNumber}</span>
        <span>Email: {client.email}</span>

        <div className="flex flex-row">
          <Button
            className="w-40 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-2"
            onClick={() => navigate(`/client/edit/${client.id}`)}
          >
            Edit Client
          </Button>
          <Button
            className="w-40 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-2"
            onClick={handleShowModal}
          >
            Delete Client
          </Button>
          <Button
            className="w-40 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-2"
            onClick={() => navigate(`/client/gallery/${client.id}`)}
          >
            Gallery
          </Button>
          <DeleteClientModal
            show={showModal}
            handleClose={handleCloseModal}
            handleDelete={handleDelete}
          />
        </div>

        <Appointments clientId={client.id} />
      </div>
    );
  };

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      {renderClientDetails()}
    </div>
  );
}

export default ClientDetailsPage;
