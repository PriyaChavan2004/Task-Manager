 
import React, { useState } from "react";
import API from "../services/api";

  const Login = ({ onLogin, setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setError("");
        onLogin();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-[30%] mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="w-full bg-violet-700 text-white py-2 rounded hover:bg-violet-900"
      >
        Login
      </button>
      <p className="mt-3 text-sm text-center">
        Don't have an account?{' '}
        <span
          onClick={() => setShowRegister(true)}
          className="text-violet-700 underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
