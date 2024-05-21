import React from "react";
import Clients from "../components/clients/Clients";
import SidebarShort from "../components/SidebarShort";
import { useState } from "react";
function ClientsPage() {
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col p-5 w-full">
        <h2 className="m-0">Clients</h2>
        <input
          className="w-50 my-2 p-1 border-b-2  border-black"
          id="searchtableinput"
          type="text"
          placeholder="Search Client"
          onChange={handleChangeSearch}
          value={searchInput}
        />
        <Clients searchInput={searchInput} />
      </div>
    </div>
  );
}

export default ClientsPage;
