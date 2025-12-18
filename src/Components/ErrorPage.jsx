import React from "react";
import { NavLink } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <NavLink
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
