import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { Modal ,Form,Button} from 'react-bootstrap';
import { createAppointment } from '../../api/appointmentApi';

const AddAppointment=({clientId,loginDetails,showAddModal,handleClose, updateAppointmentList})=> {

    const [formData, setFormData] = useState({
        activity: '',
        medication: '',
        complications: '',
        date: '',
        time: '',
        clientId: clientId
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            createAppointment(formData,loginDetails.token).then(()=>{
              handleClose()
              updateAppointmentList()
            })
        } catch (error) {
            console.log(error)
        }
        console.log(formData);
        
        // Add your logic to send the data to the server or perform other actions
      };
      
  return (
    <Modal show={showAddModal} onHide={handleClose}>
<Modal.Header>
    Add Appointment
</Modal.Header>
<Modal.Body>
<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="activity">
        <Form.Label>Activity</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter activity"
          name="activity"
          value={formData.activity}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="medications">
        <Form.Label>Medications</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter medications"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="complications">
        <Form.Label>Complications</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter complications"
          name="complications"
          value={formData.complications}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="time">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </Form.Group>
      
      <Button onClick={handleClose} className="mr-4 text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white ">Cancel</Button>
      <Button className="float-right text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white " type="submit">
        Submit
      </Button>

      
    </Form>
</Modal.Body>
    </Modal>
  )
}

export default AddAppointment