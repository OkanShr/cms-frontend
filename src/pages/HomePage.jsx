import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import SidebarShort from "../components/SidebarShort";
import {
  getClientCount,
  getRegisterGraphData,
  lastCreatedClientNumber,
} from "../api/clientApi";
import { useSelector } from "react-redux";
import { getAppointmentData } from "../api/appointmentApi";

function HomePage() {
  const loginDetails = useSelector((state) => state.auth.value);
  const [clientsData, setClientsData] = useState({
    last3Months: 0,
    last6Months: 0,
    last12Months: 0,
  });
  const [graphData, setGraphData] = useState({});
  const [clientCount, setClientCount] = useState(0);

  const [appointmentData, setAppointmentData] = useState({
    Surgery: 0,
    Botox: 0,
    Consulting: 0,
    Example: 0,
  });

  const getClientGraphData = async () => {
    try {
      const response = await getRegisterGraphData(loginDetails.token);
      setGraphData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const _getAppointmentData = async () => {
    try {
      const response = await getAppointmentData(loginDetails.token);
      setAppointmentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const _getClientCount = async () => {
    try {
      const response = await getClientCount(loginDetails.token);
      setClientCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastCreatedClientNumber(3);
    getLastCreatedClientNumber(6);
    getLastCreatedClientNumber(12);
    _getAppointmentData();
    _getClientCount();
    getClientGraphData();
  }, [loginDetails.token]);

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={true} clients={false} addClient={false} />
      <Dashboard
        clientsLast3Months={clientsData.last3Months}
        clientsLast6Months={clientsData.last6Months}
        clientsLast12Months={clientsData.last12Months}
        appointmentData={appointmentData}
        clientCount={clientCount}
        graphData={graphData}
      />
    </div>
  );
}

export default HomePage;
