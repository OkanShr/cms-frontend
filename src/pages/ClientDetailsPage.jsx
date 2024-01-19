import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById } from "../api/clientApi";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import SidebarShort from "../components/SidebarShort";
import Appointments from "../components/appointments/Appointments";
import { ChevronLeft } from "lucide-react";
function ClientDetailsPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  useEffect(() => {
    getClientById(clientId, loginDetails.token).then((x) => {
      setClient(x.data);
    });
  }, [clientId]);

  function doesClientExist() {
    if (!client) {
      return <div>Client Not Found</div>;
    } else {
      return (
        <div className="flex flex-col p-5 w-full">
          <div className="flex flex-row">
            <button onClick={() => navigate("/clients")}>
              <ChevronLeft size={35} />
            </button>
            <h2>Client Details</h2>
          </div>

          {/* Render your client details here */}
          <span>Vorname: {client.firstName}</span>
          <span>Nachname: {client.lastName}</span>
          <span>Telefon Nummer: {client.phoneNumber}</span>
          <span>Email: {client.email}</span>
          <Button
            className="w-40 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-2"
            onClick={() => navigate(`/client/edit/${client.id}`)}
          >
            Edit Client
          </Button>
          {/* other client details */}
          <Appointments clientId={client.id} />
        </div>
      );
    }
  }

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      {doesClientExist()}
    </div>
  );
}

export default ClientDetailsPage;
