import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAppointments } from "../../api/appointmentApi";
import { ListGroup, Button } from "react-bootstrap";
import AppointmentDetails from "./AppointmentDetails";
import { FilePlus } from "lucide-react";
import AddAppointment from "./AddAppointment";
import EditAppointment from "./EditAppointment";

const Appointments = ({ clientId, clientName, clientLastName }) => {
  const loginDetails = useSelector((state) => state.auth.value);

  const [appointments, setAppointments] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const updateAppointmentList = () => {
    getAllAppointments(loginDetails.token, clientId)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  useEffect(() => {
    updateAppointmentList();
  }, []);

  const shouldShowAppointment = (appointment) => {
    return searchInput === "" || appointment.date.startsWith(searchInput);
  };

  return (
    <>
      <div className="flex flex-row items-center ">
        <h4>Appointments</h4>
        <div className="flex justify-end items-start ml-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className=" w-11 h-11 border-3 bg-gradient-to-tr from-teal-200 to-teal-100 border-teal-700 rounded-full flex items-center justify-center"
          >
            <FilePlus />
          </button>
        </div>
      </div>
      <AddAppointment
        loginDetails={loginDetails}
        showAddModal={showAddModal}
        handleClose={handleCloseModals}
        clientId={clientId}
        updateAppointmentList={updateAppointmentList}
        clientName={clientName}
        clientLastName={clientLastName}
      />
      <input
        className="w-50 mb-2 p-1 border-b-2 bg-transparent border-black"
        id="searchtableinput"
        type="text"
        placeholder="Search Appointment By Date"
        onChange={handleChangeSearch}
        value={searchInput}
      />
      <ListGroup className="gap-3 ">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            if (shouldShowAppointment(appointment)) {
              return (
                <div
                  key={appointment.id}
                  className="flex flex-row shadow-md p-3 w-2/3 rounded-lg justify-between bg-white mt-3"
                >
                  <span>{`${appointment.date.split("T")[0]} - ${
                    appointment.time
                  } | ${appointment.activity}`}</span>
                  <Button
                    className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white  "
                    onClick={() => setShowDetailsModal(true)}
                  >
                    Show Details
                  </Button>
                  <AppointmentDetails
                    updateAppointmentList={updateAppointmentList}
                    loginDetails={loginDetails}
                    appointment={appointment}
                    showDetailsModal={showDetailsModal}
                    handleClose={handleCloseModals}
                    setShowDetailsModal={setShowDetailsModal}
                    setShowEditModal={setShowEditModal}
                  />
                  <EditAppointment
                    updateAppointmentList={updateAppointmentList}
                    loginDetails={loginDetails}
                    appointment={appointment}
                    showEditModal={showEditModal}
                    handleClose={handleCloseModals}
                    setShowEditModal={setShowEditModal}
                    setShowDetailsModal={setShowDetailsModal}
                  />
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <h4>There are no Appointments</h4>
        )}
      </ListGroup>
    </>
  );
};

export default Appointments;
