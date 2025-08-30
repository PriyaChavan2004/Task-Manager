 
import { useState } from "react";
import API from "../services/api";
  
 
// eslint-disable-next-line react/prop-types
const Register = ({ setShowRegister, onLogin }) => {
  const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

 

  const handleRegister = async () => { 
    try {
      const res = await API.post("/auth/register", { email, password });
      if (res.status === 201 || res.status === 200) {
        try {
          const loginRes = await API.post("/auth/login", { email, password });
          if (loginRes.data?.token) {
            localStorage.setItem("token", loginRes.data.token);
            setSuccess(true);
            setError("");
            onLogin(); // Navigate to app
          } else {
            setError("Login failed after registration");
          }
        // eslint-disable-next-line no-unused-vars
        } catch (loginErr) {
          setError("Login failed after registration");
        }
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      if (err.response?.status === 409) {
        setError("User already exists");
      } else {
        setError(err.response?.data?.message || "Something went wrong");
      }
      setSuccess(false);
    }
  };

  return (
    <div className="w-[30%] mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
      {success && <p className="text-green-500 mb-2">Registration successful!</p>}
      <button
        onClick={handleRegister}
        className="w-full bg-violet-700 text-white py-2 rounded hover:bg-violet-900"
      >
        Register
      </button>
      <p className="mt-3 text-sm text-center">
        Already have an account?{' '}
        <span
          onClick={() => setShowRegister(false)}
          className="text-violet-700 underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
