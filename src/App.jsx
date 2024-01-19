import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { PrivateRoute } from "./pages/PrivateRoute";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"

import  ClientEditPage from './pages/ClientEditPage';
import AddClientPage from './pages/AddClientPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/clients' element={<ClientsPage />}/>
          <Route path='/addclient' element={<AddClientPage />}/>
          <Route path="/client/:clientId" element={<ClientDetailsPage/>}/>
          <Route path='/client/edit/:clientId' element={<ClientEditPage/>}/>
          {/* after login */}
        </Route>
        <Route path='/signin' element={<LoginPage />}/>


      </Routes>

    </div>
  )
}

export default App
