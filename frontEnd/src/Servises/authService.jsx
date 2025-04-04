import axios from "axios";
import { useNavigate } from "react-router-dom";
// import axios from "axios"
const authService = {
  
  login: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      console.log('response.data',response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("logined token is set by authService",token);
      return token; 
    } catch (error) {
      console.log("Login Failed ", error);
      throw error;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const response = await axios.get(
        "http://localhost:5000/user/getUserInfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
console.log("getUser info as from authService",response.data.loggedUser);
      return response.data.loggedUser;

    } catch (error) {
      console.log("failed to get User ", error);
      throw null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    alert("Sucessfully LogOut !!")
    console.log("Token is Remove from localStorage by authservices");
    
  },

  register: async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/user/register", userData);
      return response.data;
    } catch (error) {
      console.error("Registration Failed", error);
      throw error;
    }
  },
};

export default authService;
