import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import SidebarShort from "../components/SidebarShort";
import { lastCreatedClientNumber } from "../api/clientApi";
import { useSelector } from "react-redux";

function HomePage() {
  const loginDetails = useSelector((state) => state.auth.value);
  const [clientsData, setClientsData] = useState({
    last3Months: 0,
    last6Months: 0,
    last12Months: 0,
  });

  const getLastCreatedClientNumber = async (months) => {
    lastCreatedClientNumber(months, loginDetails.token)
      .then((response) => {
        setClientsData((prevState) => ({
          ...prevState,
          [`last${months}Months`]: response.data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLastCreatedClientNumber(3);
    getLastCreatedClientNumber(6);
    getLastCreatedClientNumber(12);
  }, [loginDetails.token]);

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={true} clients={false} addClient={false} />
      <Dashboard
        clientsLast3Months={clientsData.last3Months}
        clientsLast6Months={clientsData.last6Months}
        clientsLast12Months={clientsData.last12Months}
      />
    </div>
  );
}

export default HomePage;
