import React from 'react'
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users, UserPlus, CalendarDays } from "lucide-react";
export const SidebarShort=(props) => {
    const {dashboard,clients,addClient,calendar} = props;
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <Sidebar>
        <SidebarItem
          text="Dashboard"
          icon={<LayoutDashboard size={20} />}
          onclick={""}
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
        <SidebarItem
          text="Calendar"
          icon={<CalendarDays size={20}/>}
          onclick={"calendar"}
          active={calendar}
        />
      </Sidebar>

    </div>
  )
}

export default SidebarShort