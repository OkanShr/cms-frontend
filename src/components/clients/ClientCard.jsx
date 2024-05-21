import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ClientCard = (props) => {
  const { client } = props;
  const navigate = useNavigate();

  return (
    <div className="m-2 shadow-md p-2 w-6/12">
      <div className="flex flex-row justify-between ">
        <span className="text-dark  font-medium">{`${client.firstName} ${client.lastName}`}</span>
        <Button
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-2"
          onClick={() => navigate(`/client/${client.id}`)}
        >
          Client Details
        </Button>
      </div>
    </div>
  );
};
