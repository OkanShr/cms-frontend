import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../api/clientApi";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users, UserPlus, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

function ClientDetailsPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const loginDetails = useSelector((state) => state.auth.value);

  useEffect(() => {
    // Replace with your actual fetch call
    getClientById(clientId, loginDetails.token).then((x) => setClient(x.data));
  }, [clientId]);
  function doesClientExist() {
    if (!client) {
      return <div>Client Not Found</div>;
    } else {
      return (
        <div className="flex flex-col p-5 w-full">
          <h1>Client Details</h1>
          {/* Render your client details here */}
          <span>Vorname: {client.firstName}</span>
          <span>Nachname: {client.lastName}</span>
          <span>Telefon Nummer: {client.phoneNumber}</span>
          <span>Email: {client.email}</span>
          {/* other client details */}
        </div>
      );
    }
  }

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <Sidebar>
        <SidebarItem
          text="Dashboard"
          icon={<LayoutDashboard size={20} />}
          onclick={"home"}
        />
        <SidebarItem
          text="Clients"
          icon={<Users size={20} />}
          onclick={"clients"}
          active
        />
        <SidebarItem
          text="Add Client"
          icon={<UserPlus size={20} />}
          onclick={"addclient"}
        />
      </Sidebar>
      {doesClientExist()}
    </div>
  );
}

export default ClientDetailsPage;
