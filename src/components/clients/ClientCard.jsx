import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ClientCard = ({ client }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 shadow-md rounded-lg border p-4 bg-white hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <span className=" p-3 text-lg font-semibold text-gray-800">
          {`${client.firstName} ${client.lastName}`}
        </span>
        <button
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border border-teal-500 shadow-md shadow-teal-700 p-2 rounded-lg h-full "
          onClick={() => navigate(`/client/${client.id}`)}
        >
          Client Details
        </button>
      </div>
    </div>
  );
};
