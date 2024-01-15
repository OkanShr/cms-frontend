import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";
import Dashboard from "../components/Dashboard";

function HomePage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <Sidebar>
        <SidebarItem
          text="Dashboard"
          icon={<LayoutDashboard size={20} />}
          onclick={"home"}
          active
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
        />
      </Sidebar>

      <Dashboard />
    </div>
  );
}

export default HomePage;
