import React from "react";
import { Navigate, useLocation } from "react-router"; // ✅ react-router-dom
import useAuth from "../Hook/useAuth";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While checking auth state
  if (loading) {
    return <Loader></Loader>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in, allow access
  return children;
};

export default PrivateRoute;
