import React, { useEffect, useState } from "react";
import Clients from "../components/clients/Clients";
import SidebarShort from "../components/SidebarShort";
import { getAllClients } from "../api/clientApi";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddClientModal from "../components/clients/AddClientModal";

function ClientsPage() {
  const loginDetails = useSelector((state) => state.auth.value);
  const [clients, setClients] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const updateClientList = () => {
    getAllClients(loginDetails.token).then((response) => {
      setClients(response.data);
    });
  };

  useEffect(() => {
    updateClientList();
  }, [loginDetails.token]); // Add loginDetails.token as a dependency

  return (
    <div className="flex bg-gray-100 h-screen">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col p-5 w-full ">
        <h1 className=" m-2 text-4xl font-semibold mb-4">Clients</h1>
        <div className="flex flex-row">
          <input
            className="m-2 w-60 p-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
            id="searchtableinput"
            type="text"
            placeholder="Search Client"
            onChange={handleChangeSearch}
            value={searchInput}
          />
          <Button onClick={() => setShowAddClientModal(true)}>
            Add Client
          </Button>
        </div>
        <AddClientModal
          updateClientList={updateClientList}
          loginDetails={loginDetails}
          showAddClientModal={showAddClientModal}
          setShowAddClientModal={setShowAddClientModal}
        />
        <Clients clients={clients} searchInput={searchInput} />
      </div>
    </div>
  );
}

export default ClientsPage;
