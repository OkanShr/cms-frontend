import React, { useState } from 'react';
import { Form,Col, Row} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { createClient } from '../api/clientApi';
const ClientForm = () => {
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
    
    // Perform actions with the form data, for now, let's just log it
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleImageChange = (e) => {
    // const files = e.target.files;
    // setFormData({
    //   ...formData,
    //   imageList: files,
    // });
    
    // TODO: Process and upload files to server
  // };

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

      {/* <Row>
        <Form.Group as={Col} controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>
      </Row> */}

      {/* <Row>
        <Form.Group as={Col} controlId="formImageUpload">
          <Form.Label>Image List</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter image URLs separated by commas"
            name="imageList"
            value={formData.imageList}
            onChange={handleImageChange}
          />
        </Form.Group>
      </Row> */}
      <p className='text-lime-500 mt-2'>{message}</p>
      <p className='text-red-500 mt-2'>{err}</p>
      <button className='mt-1 rounded-md px-3 py-1.5 ml-6
           text-indigo-800 transition-all bg-gradient-to-tr from-indigo-200 to-indigo-100' type="submit">
        Submit
      </button>
    </Form>
  );
};

export default ClientForm;