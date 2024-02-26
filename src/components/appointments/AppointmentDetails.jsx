import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteAppointment } from '../../api/appointmentApi';
import { Slider } from '../misc/Slider';
import { Maximize2, Minimize2 } from 'lucide-react';

const AppointmentDetails = ({
  updateAppointmentList,
  loginDetails,
  appointment,
  showDetailsModal,
  handleClose,
  setShowDetailsModal,
  setShowEditModal,
}) => {
  const handleDelete = () => {
    try {
      deleteAppointment(appointment.id, loginDetails.token).then(() => {
        handleClose();
        updateAppointmentList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEdit = () => {
    setShowDetailsModal(false);
    setShowEditModal(true);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1'); // Default tab is 'tab1'

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size={isFullscreen ? 'xl' : 'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Subject: {appointment.activity}</p>
        <p>Medications: {appointment.medication}</p>
        <p>Complications: {appointment.complications}</p>
        <p>Date: {appointment.date.split('T')[0]}</p>
        <p>Time: {appointment.time}</p>
        <h4>Gallery</h4>
        <div>
          <Button onClick={() => handleTabChange('tab1')} className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}>
            Tab 1
          </Button>
          <Button onClick={() => handleTabChange('tab2')} className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}>
            Tab 2
          </Button>
        </div>
        <div className='tabs-container'>
          <div className={`tab ${activeTab === 'tab1' ? 'active' : ''}`}>
            {activeTab === 'tab1' && <Slider />}
          </div>
          {/* Add more tabs here if needed */}
        </div>
        {!isFullscreen && (
          <Button onClick={toggleFullscreen} className="float-right mt-2 mr-8 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white">
            <Maximize2 />
          </Button>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOpenEdit} className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white">
          Edit Appointment
        </Button>
        <Button onClick={handleDelete} className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white">
          Delete Appointment
        </Button>
      </Modal.Footer>
      {isFullscreen && (
        <Modal.Body>
          <div className="w-full fixed inset-0 z-50 overflow-auto bg-gray-900">
            <div className="flex justify-end pt-4 pr-4">
              <Button onClick={toggleFullscreen} className="text-white">
                <Minimize2 />
              </Button>
            </div>
            <div className="flex justify-center items-center h-screen">
              {activeTab === 'tab1' && (
                <Slider className="w-full h-full" />
              )}
            </div>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default AppointmentDetails;
