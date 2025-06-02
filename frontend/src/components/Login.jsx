import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email && !password) {
      return handleError("email, password are required");
    }

    if (!email) {
      return handleError("email is required");
    }
    if (!password) {
      return handleError("password is required");
    }

    try {
      const baseUrl = import.meta.env.VITE_URL;
      const endPoints = `/users/login`;
      const url = `${baseUrl}${endPoints}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(res);

      const data = await res.json();
      console.log(data);
      const { message, success, token, name, ogemail } = data;
      console.log(data);

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/protect");
        }, 1000);
      }

      if (!success) {
        return handleError("No email exist with this email");
      }

      // if (email !== ogemail) {
      //   return handleError("No email exist with this email");
      // }
    } catch (error) {
      console.error(error);

      handleError(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
          Create a new account?{" "}
          <Link to="/register" style={{ color: "darkblue" }}>
            Register here
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
