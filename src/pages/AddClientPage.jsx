import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";
import ClientForm from "../components/ClientForm";

function AddClientPage() {
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
        />
        <SidebarItem
          text="Add Client"
          icon={<UserPlus size={20} />}
          onclick={"addclient"}
          active
        />
      </Sidebar>
      <div className="flex flex-col p-5 w-full">
        <h2>Add Client</h2>
      <ClientForm />
      </div>
      
    </div>
  );
}

export default AddClientPage;
