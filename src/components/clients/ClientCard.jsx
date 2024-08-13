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
        <Button
          className="mt-2 md:mt-0 ml-2 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border border-teal-500 shadow-md shadow-teal-700 px-4 py-2 rounded-lg  whitespace-nowrap"
          onClick={() => navigate(`/client/${client.id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};
