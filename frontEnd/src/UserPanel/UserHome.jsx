import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from '../Components/NavBar'
import UserProducts from './UserProducts'
// import Home from './Home';
import AddTask from './AddTask';
import AllTask from './AllTask';
import TaskDetails from './TaskDetails';

const UserHome = () => {
  return (
  <>
  <div >
      <NavBar/>
    
      <div className='w-100' > 
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          {/* <Route path="UserProducts" element={<UserProducts />} /> */}
          {/* <Route path="Home" element={<Home />} /> */}
          <Route path="Home" element={<AllTask />} />
          <Route path="AddTask" element={<AddTask />} />
          <Route path="TaskDetails/:id" element={<TaskDetails />} />


       

        </Routes>
      </div>
      
    </div>
  </>
  )
}

export default UserHome