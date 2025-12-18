import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";

const ChefRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isChef, isFraud, roleLoading } = useRole();
  const location = useLocation();

  // 1️⃣ Auth বা Role এখনো load হচ্ছে
  if (loading || roleLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // 2️⃣ User logged in না
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Chef না হলে ঢুকতে পারবে না
  if (!isChef) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Chef কিন্তু fraud হলে block
  if (isFraud) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  // 5️⃣ Valid chef
  return children;
};

export default ChefRoute;
