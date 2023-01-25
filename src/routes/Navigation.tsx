import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../Layouts/ProtectedRoute";
import { Login } from "../pages/Login";
import { Movements } from "../pages/Movements";

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="movements" element={<Movements />} />
      </Route>
    </Routes>
  );
};
