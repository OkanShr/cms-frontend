import React, { useState } from 'react';
import { loginUser } from '../api/authApi'; 
import { Button, Form, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    username: "",

  });

  const [error, setError] = useState("");


  const loginFunction = (e) => {
    e.preventDefault();
    loginUser(loginDetails)
      .then((x) => {
        setError("");
        const data = x.data;
        console.log(data);
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
  };



  return (
    <div className='bg-gray-700 h-screen justify-center flex flex-col'>
        <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
        <div className='flex flex-col text-gray-400 py-2'>
        <Form className='max-w-[350px] w-full m-auto bg-gray-900 p-8 px-8 rounded-lg justify-center' onSubmit={loginFunction}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="formlabels">E-Mail</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
            type="text"
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            placeholder="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            
            type="password"
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            placeholder="password"
          />
        </Form.Group>
        <p className="font-weight-light text-danger">{error}</p>
        <div className="d-flex ">
          <Button required type="submit" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-md' >
            Login
          </Button>
        </div>
      </Form>  
    </div>
    </div>
  );
}

export default Login;