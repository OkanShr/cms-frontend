import React, { useState } from 'react';
import { loginUser } from '../api/authApi'; 
import { Button, Form, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from '../store/authentication';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginFunction = (e) => {
    e.preventDefault();
    console.log(loginDetails)
    loginUser(loginDetails)
      .then((x) => {
        console.log(x)
        setError("");
        const data = x.data;
        dispatch(
          login({
            token: data.token,
            user: data.doctor,
          })
        );
        navigate("/");
      })
      .catch((e) => {
        setError(e.response.data.error);
      });
  };


  return (
    <div className='bg-teal-800 h-screen justify-center flex flex-col'>
        
        <div className='flex flex-col text-dark font-medium text-white py-2'>
        
        <Form className='max-w-[350px] w-full m-auto bg-slate-200 bg-opacity-30 p-8 px-8 rounded-lg justify-center' onSubmit={loginFunction}>
          <h2 className='text-4xl text-white font-bold text-center mb-2'>SIGN IN</h2>
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
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-md'>Login</button>
        </div>
      </Form>  
    </div>
    </div>
  );
}

export default Login;