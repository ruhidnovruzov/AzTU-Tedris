import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/admin"; 
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.endsWith("@aztu.edu.az")) {
      setError("Korporativ email ilə giriş edin");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email və parol daxil edin");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      localStorage.setItem("token", response.data.token); 
      window.location.href = "/admin"; 
    } catch (err) {
      setError(err.response?.data?.message || "Girişdə xəta baş verdi");
    }
  };
  

  return (
    <div className="w-full h-screen flex justify-center items-center p-3">
      <div className="bg-white font-medium p-4 py-8 md:p-8 rounded-2xl shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-6 text-[#0E205B]">
          AzTU tədris
        </h1>
        <form onSubmit={handleSubmit}> 
          <div className="mb-4 h-[60px]">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="w-full p-2.5 mb-1 border-b placeholder:text-sm border-b-gray-300 focus:placeholder:hidden focus:outline-none focus:border-[#0E205B]"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="Parol"
              className="w-full p-2.5 border-b border-b-gray-300 placeholder:text-sm focus:outline-none focus:border-[#0E205B]"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Gizlət" : "Göstər"}
            </button>
          </div>
          <button
            type="submit" 
            className="w-full bg-[#0E205B] text-white py-3 rounded-3xl hover:bg-[#091a45] transition duration-300"
          >
            Giriş Et
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
