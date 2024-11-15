import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        token,
        email: decoded.email,
        name: decoded.name,
        surname: decoded.surname,
        role: decoded.role,
      });
      setUserRole(decoded.role); 
    }
  }, []);

  const login = async (email, password) => {
    const credentials = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const decoded = jwtDecode(response.data.token); 

        setUser({
          token: response.data.token,
          email: decoded.email,
          name: decoded.name,
          surname: decoded.surname,
          role: decoded.role,
        });
        window.location.href = "/admin";
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed, please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
