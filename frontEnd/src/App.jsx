import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from './Components/Registration';
// import AdminHome from './AdminPanel/AdminHome';
import UserHome from './UserPanel/UserHome';
function App() {
 

  return (
    <>
    <Router>
   
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          {/* <Route path="/AdminHome/*" element={<AdminHome />} /> */}
          <Route path="/UserHome/*" element={<UserHome />} />
        </Routes>

    </Router>
      
    </>
  )
}

export default App
