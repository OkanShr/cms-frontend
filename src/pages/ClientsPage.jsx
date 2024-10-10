import React, { useEffect, useState } from "react";
import Clients from "../components/clients/Clients";
import SidebarShort from "../components/SidebarShort";
import { getAllClients } from "../api/clientApi";
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
    <div className="flex bg-pink_light h-screen">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col p-5 w-full ">
        <h1 className=" m-2 text-4xl font-semibold mb-4">Patientenliste</h1>
        <div className="mb-20 flex flex-col md:flex-row items-start md:items-center">
          <input
            className="m-2 w-full md:w-60 p-2 rounded-lg border border-pink-300 focus:outline-none focus:border-pink-500"
            id="searchtableinput"
            type="text"
            placeholder="Patientensuche"
            onChange={handleChangeSearch}
            value={searchInput}
          />
          <button
            onClick={() => setShowAddClientModal(true)}
            className="custom-button"
          >
            Patient Hinzufügen
          </button>
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
