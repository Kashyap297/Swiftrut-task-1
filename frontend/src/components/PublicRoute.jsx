import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If user is authenticated, redirect to home page, otherwise show the public route (e.g., login or register)
  return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
