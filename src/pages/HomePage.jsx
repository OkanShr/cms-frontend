import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";
import Dashboard from "../components/Dashboard";
import SidebarShort from "../components/SidebarShort";
function HomePage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort 
      dashboard={true}
      clients={false}
      addClient={false}
      />

      <Dashboard />
    </div>
  );
}

export default HomePage;
