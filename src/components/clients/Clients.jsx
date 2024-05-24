import React, { useEffect, useState } from "react";
import { getAllClients } from "../../api/clientApi";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { ClientCard } from "./ClientCard";

function Clients({ searchInput }) { // Destructure searchInput from props
  const loginDetails = useSelector((state) => state.auth.value);

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const updateClientList = () => {
      getAllClients(loginDetails.token).then((response) => {
        setClients(response.data);
      });
    };

    updateClientList();
  }, [loginDetails.token]); // Add loginDetails.token as a dependency

  return (
    <div>
    <ListGroup>
      {clients.length > 0 ? (
        clients.map((client) => {
          const fullName = `${client.firstName} ${client.lastName}`;
          if (fullName.toLowerCase().startsWith(searchInput.toLowerCase())) {
            return <ClientCard key={client.id} client={client} />;
          }
          return null;
        })
      ) : (
        <p className="text-center mt-4">No Clients Found</p>
      )}
    </ListGroup>
  </div>
);
}


export default Clients;