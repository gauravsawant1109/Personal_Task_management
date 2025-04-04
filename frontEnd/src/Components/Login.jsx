import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Servises/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await authService.login(email, password);
      console.log("login function calling token", token);

      const userInfo = await authService.getUser();
      if (userInfo) {
        alert("Login Successful!");

        if (userInfo.role === "user") {
          navigate("/UserHome");
        } else {
          alert("User role not recognized.");
        }
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card  p-4">
            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className=" text-center mb-2">
                <Link to="/Registration">To Registration</Link>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
