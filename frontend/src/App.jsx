import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";

import { Navigate, Route, Routes } from "react-router-dom";
import Protect from "./components/Protect";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/protect"
          element={
            <PrivateRoute>
              <Protect />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
