import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllAppointments } from "../../api/appointmentApi";
import { ListGroup, Button } from "react-bootstrap";
import AppointmentDetails from "./AppointmentDetails";
import { FilePlus } from "lucide-react";
import AddAppointment from "./AddAppointment";
import EditAppointment from "./EditAppointment";


const Appointments=({clientId})=> {
  const loginDetails = useSelector((state) => state.auth.value);

  const [appointments, setAppointments] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal,setShowEditModal] = useState(false);

  const handleClose = () => {
    setShowDetailsModal(false)
    setShowAddModal(false)
    setShowEditModal(false)
};

  const updateAppointmentList = () => {
    getAllAppointments(loginDetails.token,clientId).then((response) => {
      setAppointments(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    updateAppointmentList();
    console.log(showAddModal)
  }, []);

  return (
    <>
        <div className="flex flex-row">
        <h2>Appointments</h2>
        <Button onClick={()=> setShowAddModal(true)} className="m-2 p-2 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white ">
        <FilePlus/>
        </Button>
        </div>
        <AddAppointment
                loginDetails={loginDetails}
                showAddModal={showAddModal}
                handleClose={handleClose}
                clientId={clientId}
                updateAppointmentList={updateAppointmentList}
              />

      <ListGroup>
        {appointments && appointments.length > 0 ? (
          appointments.map((x) => (
            <div
              key={x.id}
              className="flex flex-row shadow-md p-3 w-2/3 justify-between"
            >
              <span >{`${x.date.split("T")[0]} - ${
                x.activity
              }`}</span>
              <Button
                className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white "
                onClick={()=>setShowDetailsModal(true)}
              >

                Show Details
              </Button>
              <AppointmentDetails
                updateAppointmentList={updateAppointmentList}
                loginDetails={loginDetails}
                appointment={x}
                showDetailsModal={showDetailsModal}
                handleClose={handleClose}
                setShowDetailsModal={setShowDetailsModal}
                setShowEditModal={setShowEditModal}
              />
              <EditAppointment
                updateAppointmentList={updateAppointmentList}
                loginDetails={loginDetails}
                appointment={x}
                showEditModal={showEditModal}
                handleClose={handleClose}
                setShowEditModal={setShowEditModal}
                setShowDetailsModal={setShowDetailsModal}
              />
                       
            </div>
          ))
        ) : (
          <h4>There are no Appointments</h4>
        )}
      </ListGroup>
    </>
  );
}

export default Appointments;
