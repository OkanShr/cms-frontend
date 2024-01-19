import React, { useState } from 'react';
import { Form,Col, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { createClient } from '../../api/clientApi';


export const ClientForm = () => {
const loginDetails = useSelector((state) => state.auth.value);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    doctorId: loginDetails.user.userId
  });

  const [message, setMessage] = useState("")
  const [err, setErr] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createClient(formData,loginDetails.token).then((x)=> {setMessage(`Client ${x.data.firstName} created succesfully`)})
    } catch (error) {
      console.log(error);
      setErr("Failed due to an Error.")
    }
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form className='w-6/12' onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <p className='text-lime-500 mt-2'>{message}</p>
      <p className='text-red-500 mt-2'>{err}</p>
      <button className='mt-1 rounded-md px-3 py-1.5 ml-6
           text-teal-800 transition-all bg-gradient-to-tr from-teal-200 to-teal-100' type="submit">
        Submit
      </button>
    </Form>
  );
};
