import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { PrivateRoute } from "./pages/PrivateRoute";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

function App() {
  const loginDetails = useSelector((state) => state.auth.value);

  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          {/* after login */}
        </Route>
        <Route path='/signin' element={<LoginPage />}/>


      </Routes>

    </div>
  )
}

export default App
