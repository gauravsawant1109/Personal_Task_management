import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../Servises/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Registration = () => {
  const [user, setUser] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    console.log("Registration function calling user",user);
    
    e.preventDefault();

    try {
      const response = await authService.register(user);
      console.log("response ",response);
      
     
        alert(response.message);
        navigate("/Login");
    
    } catch (error) {
      alert( "Registration failed. Please try again." );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Register</h2>

         

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control" name="contactNumber" value={user.contactNumber} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
              </div>

              {/* <div className="mb-3">
                <label className="form-label d-block">Role</label> */}
                {/* <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" value="admin" name="role" checked={user.role === "admin"} onChange={handleChange} />
                  <label className="form-check-label">Admin</label>
                </div> */}
                {/* <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" value="user" name="role" checked={user.role === "user"} onChange={handleChange} />
                  <label className="form-check-label">User</label>
                </div>
              </div> */}

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
