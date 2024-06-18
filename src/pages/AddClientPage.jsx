import React from "react";
import { ClientForm } from "../components/forms/ClientForm";
import SidebarShort from "../components/SidebarShort";
function AddClientPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={false} addClient={true} />
      <div className="flex flex-col p-5 w-full">
        <h2>Add Client</h2>
        <ClientForm />
      </div>
    </div>
  );
}

export default AddClientPage;
