import React from 'react'
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users, UserPlus, LogOut } from "lucide-react";
export const SidebarShort=(props) => {
    const {dashboard,clients,addClient} = props;
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <Sidebar>
        <SidebarItem
          text="Dashboard"
          icon={<LayoutDashboard size={20} />}
          onclick={"home"}
          active={dashboard}
        />
        <SidebarItem
          text="Clients"
          icon={<Users size={20} />}
          onclick={"clients"}
          active={clients}
        />
        <SidebarItem
          text="Add Client"
          icon={<UserPlus size={20} />}
          onclick={"addclient"}
          active={addClient}
        />
      </Sidebar>

    </div>
  )
}

export default SidebarShort