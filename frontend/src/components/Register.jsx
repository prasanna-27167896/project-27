import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    setpassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, setpassword } = form;

    if (!username && !email && !password && !setpassword) {
      return handleError(
        "username, email, password, set password are required"
      );
    }

    if (password !== setpassword) {
      return handleError("Password not matched");
    }

    if (!username) {
      return handleError("username is required");
    }
    if (!email) {
      return handleError("email is required");
    }
    if (!password) {
      return handleError("password is required");
    }
    if (!setpassword) {
      return handleError("set password is required");
    }

    try {
      const baseUrl = import.meta.env.VITE_URL;
      const endPoints = `/users/register`;
      const url = `${baseUrl}${endPoints}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
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
        <input
          type="password"
          name="setpassword"
          placeholder="Set Password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <span>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "darkblue" }}>
            Login here
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
