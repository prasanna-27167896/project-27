import React, { useEffect, useState } from "react";
import { handleSuccess } from "../utils.js";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BioInsta from "../protectedComps/BioInsta";

export default function Protect() {
  const [loggedInUser, setLoggedInUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <BioInsta user={loggedInUser} handleLogout={handleLogout} />
      <ToastContainer handleLogout={handleLogout} />
    </>
  );
}
