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
    <div className="pt-4 shadow-md rounded-sm w-6/12 h-screen">
      <ListGroup>
        {clients.length > 0 ? (
          clients.map((x) => {
            const fullName = `${x.firstName} ${x.lastName}`;
            if (fullName.toLowerCase().startsWith(searchInput.toLowerCase())) { // Use toLowerCase for case-insensitive comparison
              return <ClientCard key={x.id} client={x} />;
            }
            return null; // Return null if the condition doesn't match
          })
        ) : (
          <p>No Clients Found</p>
        )}
      </ListGroup>
    </div>
  );
}

export default Clients;
