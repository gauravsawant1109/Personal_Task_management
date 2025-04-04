import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import authService from "../Servises/authService";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  async function handleLogOut() {
    const response = await authService.logout();
    navigate("/Login");
  }
  const getUserInfo = async () => {
    const response = await authService.getUser(token);
    setUser(response);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log("user from navbar", user);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/UserHome/Home">Task Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          
           
         
                <Nav.Link as={Link} to="/UserHome/Home">Home</Nav.Link>
                <Nav.Link as={Link} to="/UserHome/AddTask">AddTask</Nav.Link>
                {/* <Nav.Link as={Link} to="/UserHome/AllTask">Tasks</Nav.Link> */}


            <Nav.Link className="btn btn-danger" onClick={handleLogOut}>
              LogOut
            </Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
