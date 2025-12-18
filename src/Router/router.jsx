import React from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "../LayOut/RootLayout";

// Public Pages
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Meals from "../Pages/Meals";
import MealDetails from "../Pages/MealDetails";

// Dashboard Pages
import Profile from "../Pages/Dashboard/Profile";

// User
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import FavoriteMeals from "../Pages/Dashboard/User/FavoriteMeals";

// Chef
import CreateMeal from "../Pages/Dashboard/Chef/CreateMeal";
import MyMeals from "../Pages/Dashboard/Chef/MyMeals";
import OrderRequests from "../Pages/Dashboard/Chef/OrderRequests";

// Admin
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import Statistics from "../Pages/Dashboard/Admin/Statistics";

// Routes
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";
import DashBoardLayout from "../LayOut/DashBroadLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "meals", element: <Meals /> },
      {
        path: "meals/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "profile", element: <Profile /> },

      // USER
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "favorites", element: <FavoriteMeals /> },

      // CHEF
      {
        path: "create-meal",
        element: (
          <ChefRoute>
            <CreateMeal />
          </ChefRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <MyMeals />
          </ChefRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <ChefRoute>
            <OrderRequests />
          </ChefRoute>
        ),
      },

      // ADMIN
      {
        path: "manage-users",
        element: (
         
           <AdminRoute>
             <ManageUsers />
           </AdminRoute>

        ),
      },
      {
        path: "manage-requests",
        element: (
          <AdminRoute>
            <ManageRequests />
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
