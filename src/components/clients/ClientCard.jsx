import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ClientCard = ({ client }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 md:w-9/12 lg:w-96 shadow-md rounded-lg border p-4 bg-white hover:shadow-lg transition duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <span className="mb-2 md:mb-0 p-3 text-lg font-semibold text-gray-800 whitespace-nowrap">
          {`${client.firstName} ${client.lastName}`}
        </span>
        <button
          className="custom-button"
          onClick={() => navigate(`/client/${client.id}`)}
        >
          Details
        </button>
      </div>
    </div>
  );
};
