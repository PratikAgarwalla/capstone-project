import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMessage({ text: "Login Successful! Redirecting...", type: "success" });

      setTimeout(() => {
        navigate("/dashboard"); // Redirect to LearnIt.com dashboard
      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage({
        text: err.response?.data?.message || "Login failed",
        type: "danger",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #74ebd5, #acb6e5)" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "400px", background: "#fff", borderRadius: "10px" }}
      >
        <h3 className="text-center text-primary">
          Welcome to LearnIt.com - Please Login
        </h3>
        {message.text && (
          <div className={`alert alert-${message.type} mt-2`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
