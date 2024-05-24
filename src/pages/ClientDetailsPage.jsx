import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { ChevronLeft } from "lucide-react";
import SidebarShort from "../components/SidebarShort";
import Appointments from "../components/appointments/Appointments";
import { deleteClient, getClientById } from "../api/clientApi";
import DeleteClientModal from "../components/clients/DeleteClientModal";
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import galleryImage from "../assets/gallery.png";
import docsImage from "../assets/document.png";

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
      <div className="flex flex-col p-2 w-full space-y-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/clients")}
            className="text-teal-500 hover:text-teal-700"
          >
            <ChevronLeft size={35} />
          </button>

          <h2 className="text-3xl font-semibold text-gray-800">
            Client Details
          </h2>
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

            {/* <button
              className="px-4 py-2 text-black hover:bg-orange-300 rounded shadow"
              onClick={() => navigate(`/client/edit/${client.id}`)}
            >
              <img src={editImage} alt="" className="w-6 h-6 mr-2" />
              Edit Client
            </button> */}
            {/* <button
            className="px-4 py-2 text-black  hover:bg-red-600 rounded shadow"
            onClick={handleShowModal}
          >
            <img src={deleteImage} alt=""className="w-6 h-6 mr-2" onClick={handleShowModal} />
            Delete Client
          </button> */}
            {/* <button
            className="px-4 py-2 text-white hover:bg-sky-600 rounded shadow"
            onClick={() => navigate(`/client/gallery/${client.id}`)}
          >
            <img src={galleryImage} alt="" className="w-6 h-6 mr-2"/>
            Gallery
          </button> */}

            <DeleteClientModal
              show={showModal}
              handleClose={handleCloseModal}
              handleDelete={handleDelete}
            />
          </div>
        </div>

        <div className="m-6 pt-6 text-gray-700 flex flex-col gap-3 text-lg">
          <p>
            <span className="font-medium ">Vorname:</span> {client.firstName}
          </p>
          <p>
            <span className="font-medium">Nachname:</span> {client.lastName}
          </p>
          <p>
            <span className="font-medium">Telefon Nummer:</span>{" "}
            {client.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Email:</span> {client.email}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <Appointments clientId={client.id} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100  min-h-screen flex">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg m-6">
        {renderClientDetails()}
      </div>
    </div>
  );
}

export default ClientDetailsPage;
