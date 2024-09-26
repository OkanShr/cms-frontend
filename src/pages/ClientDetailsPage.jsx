import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import SidebarShort from "../components/SidebarShort";
import Appointments from "../components/appointments/Appointments";
import { deleteClient, getClientById } from "../api/clientApi";
import DeleteClientModal from "../components/clients/DeleteClientModal";
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import galleryImage from "../assets/gallery.png";
import docsImage from "../assets/document.png";
import manImg from "../assets/man.png";
import womanImg from "../assets/woman.png";

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
      return <div>Keine Patienten Gefunden</div>;
    }

    return (
      <div className="flex flex-col p-2 w-full space-y-8">
        <div className="flex">
          <button
            onClick={() => navigate("/clients")}
            className="mt-2 flex items-start text-pink-500 hover:text-pink-700"
          >
            <ChevronLeft size={35} />
          </button>
          {/* Title and client menu buttons */}
          <div className="flex justify-between flex-col lg:flex-row  w-full">
            <h1 className="ml-2 font-semibold text-gray-800 whitespace-nowrap">
              Patientendetails
            </h1>
            <div className="flex justify-end items-start space-x-4 ml-auto">
              <div className="relative inline-block px-4 py-2 text-black cursor-pointer group">
                <img
                  src={editImage}
                  alt=""
                  className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
                  onClick={() => navigate(`/client/edit/${client.id}`)}
                />
              </div>

              <div className="relative inline-block px-4 py-2 text-black cursor-pointer group">
                <img
                  src={deleteImage}
                  alt=""
                  className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
                  onClick={handleShowModal}
                />
              </div>

              <div className="relative inline-block px-4 py-2 text-black cursor-pointer group">
                <img
                  src={galleryImage}
                  alt=""
                  className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
                  onClick={() => navigate(`/client/gallery/${client.id}`)}
                />
              </div>

              <div className="relative inline-block px-4 py-2 text-black cursor-pointer group">
                <img
                  src={docsImage}
                  alt=""
                  className="w-6 h-6 transition-transform duration-300 transform hover:scale-110"
                  onClick={() => navigate(`/client/documents/${client.id}`)}
                />
              </div>

              <DeleteClientModal
                show={showModal}
                handleClose={handleCloseModal}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <img
            src={client.gender === "male" ? `${manImg}` : `${womanImg}`}
            className="rounded-xl object-cover h-50 w-50 max-w-[340px]"
          ></img>
          <div className="m-6 pt-6 text-gray-700 flex flex-col gap-3">
            <p>
              <span className="font-medium">Vor-Nachname:</span>{" "}
              {client.firstName} {client.lastName}
            </p>
            <p>
              <span className="font-medium">Telefon Nummer:</span>{" "}
              {client.phoneNumber}
            </p>
            <p>
              <span className="font-medium">Email:</span> {client.email}
            </p>
            <p>
              <span className="font-medium">Geburtsdatum:</span>{" "}
              {client.birthDate}
            </p>
          </div>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg">
          <Appointments
            clientId={client.id}
            clientName={client.firstName}
            clientLastName={client.lastName}
            clientBirthDate={client.birthDate}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-pink-50 min-h-screen flex md:flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-6">
        {renderClientDetails()}
      </div>
    </div>
  );
}

export default ClientDetailsPage;
