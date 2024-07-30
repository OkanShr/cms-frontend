import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users } from "lucide-react";
export const SidebarShort = (props) => {
  const { dashboard, clients } = props;
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
          text="Kunden"
          icon={<Users size={20} />}
          onclick={"clients"}
          active={clients}
        />
        <SidebarItem
          text="Google"
          icon={<Users size={20} />}
          onclick={"google"}
          isExternal={true}
        />
      </Sidebar>
    </div>
  );
};

export default SidebarShort;
