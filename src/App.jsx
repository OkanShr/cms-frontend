
import './App.css'
import { PrivateRoute } from "./pages/PrivateRoute";
import { Route, Routes } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage"

import  ClientEditPage from './pages/ClientEditPage';
import AddClientPage from './pages/AddClientPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import CalendarPage from './pages/CalendarPage';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<HomePage />}/>
          <Route path='/clients' element={<ClientsPage />}/>
          <Route path='/addclient' element={<AddClientPage />}/>
          <Route path='/calendar' element={<CalendarPage />}/>

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
