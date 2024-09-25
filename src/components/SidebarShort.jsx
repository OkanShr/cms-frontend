import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users } from "lucide-react";
import ShoreLogo from "../assets/ShoreLogo.png";
export const SidebarShort = (props) => {
  const { dashboard, clients } = props;
  return (
    <div className="bg-white-100 h-screen flex flex-row sticky top-0">
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
          icon={<img width={20} src={ShoreLogo}></img>}
          text="Shore"
          onclick={"my.shore"}
          // https://my.shore.com/calendar/week/2024-06-03:2024-06-09
          isExternal={true}
        />
      </Sidebar>
    </div>
  );
};

export default SidebarShort;
