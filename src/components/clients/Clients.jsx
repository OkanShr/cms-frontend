import React from "react";
import { ListGroup } from "react-bootstrap";
import { ClientCard } from "./ClientCard";

function Clients({ searchInput, clients }) {
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
          <p className="text-center mt-4">Keine Kunden Gefunden</p>
        )}
      </ListGroup>
    </div>
  );
}

export default Clients;
