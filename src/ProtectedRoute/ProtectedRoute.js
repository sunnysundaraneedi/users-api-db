import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
