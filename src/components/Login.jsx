import React, { useState } from 'react';
import { loginUser } from '../api/authApi'; 

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      console.log(response.data);
      // Handle successful login (e.g., redirect to a dashboard)
    } catch (error) {
      console.error('Login failed:', error.response || error);
      console.log(credentials);
      // Handle errors (e.g., show error message to the user)
    }
  };

  return (
    <div className='bg-gray-700 h-screen place-items-center flex'>
      <form className='max-w-[400px] w-full m-auto bg-gray-900 p-8 px-8 rounded-lg justify-center' onSubmit={handleSubmit}>
        <h2 className='text-4xl text-white font-bold text-center'>SIGN IN</h2>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Email</label>
          <input 
            name='email'
            placeholder='Email'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label>Password</label>
          <input 
            name='password'
            placeholder='Password'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button 
          className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-md' 
          type='submit'>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;