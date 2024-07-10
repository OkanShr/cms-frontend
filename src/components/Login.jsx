import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../store/authentication";
import "./login.css";
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
    console.log(loginDetails);
    loginUser(loginDetails)
      .then((response) => {
        console.log(response);
        setError("");
        const { token, doctor } = response.data;
        dispatch(
          login({
            token,
            user: {
              userId: doctor.userId,
              username: doctor.username,
            },
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError("Wrong Username or Password");
      });
  };

  return (
    <div className="bg-teal-100 h-screen flex items-center justify-center">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-md w-full">
        <div className="relative h-44 bg-cover bg-center bg-image">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-4xl font-bold text-white">Sign In</h1>
          </div>
        </div>
        <div className="p-8">
          <Form className="flex flex-col" onSubmit={loginFunction}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="font-medium text-gray-700">
                E-Mail
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, email: e.target.value })
                }
                type="text"
                className="rounded-lg bg-gray-200 mt-1 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="font-medium text-gray-700">
                Password
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                type="password"
                className="rounded-lg bg-gray-200 mt-1 p-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="password"
                required
              />
            </Form.Group>
            {error ? (
              <p className="text-center text-red-500 rounded-xl mb-1 p-2">
                {error}
              </p>
            ) : (
              ""
            )}

            <button className="w-full mt-4 py-2 bg-teal-700 shadow-lg text-white font-semibold rounded-lg hover:bg-teal-600">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
