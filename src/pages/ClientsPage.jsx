import React from "react";
import Clients from "../components/clients/Clients";
import SidebarShort from "../components/SidebarShort";

function ClientsPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort 
      dashboard={false}
      clients={true}
      addClient={false}
      />
      <div className="flex flex-col p-5 w-full">
        <h2 >Clients</h2>
        <Clients/>
      </div>
      
    </div>
  );
}

export default ClientsPage;
