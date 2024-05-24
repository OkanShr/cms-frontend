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

    <div className="flex bg-gray-100 h-screen">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col p-5 w-full ">
        <h1 className=" m-2 text-4xl font-semibold mb-4">Clients</h1>

        <input
          className="m-2 w-60 p-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
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