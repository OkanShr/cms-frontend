import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";
import Clients from "../components/Clients";

function ClientsPage() {
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
      <div className="flex flex-col p-5 w-full">
        <h2 >Clients</h2>
        <Clients/>
      </div>
      
    </div>
  );
}

export default ClientsPage;
