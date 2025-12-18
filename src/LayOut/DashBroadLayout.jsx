import React from "react";
import { NavLink, Link, Outlet } from "react-router";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaStar,
  FaPlusCircle,
  FaUtensils,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaTasks,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  ChefHat,
  Menu,
  LogOut,
  Home,
  Bell,
  Settings,
  UserCircle,
  Shield,
  Award,
  TrendingUp,
  Users,
  Package,
  Star,
  Heart,
  FileText,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/image.png";
import useRole from "../Hook/useRole";
import useAuth from "../Hook/useAuth";
import Footer from "../Components/Footer";

const DashBoardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out successfully"))
      .catch((err) => console.error(err));
  };

  const menuItemClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:text-amber-700 hover:shadow-md transition-all duration-300 group";

  const activeMenuClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-semibold shadow-lg border-l-4 border-amber-500";

  const roleBadges = {
    user: { color: "bg-blue-100 text-blue-700", icon: <UserCircle size={14} /> },
    chef: { color: "bg-emerald-100 text-emerald-700", icon: <ChefHat size={14} /> },
    admin: { color: "bg-purple-100 text-purple-700", icon: <Shield size={14} /> }
  };

  const userRole = roleBadges[role] || roleBadges.user;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="drawer lg:drawer-open flex-grow">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Top Navbar */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="navbar bg-gradient-to-r from-white to-amber-50 px-6 shadow-lg sticky top-0 z-40 border-b border-amber-100"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden hover:bg-amber-100">
                  <Menu size={20} className="text-amber-600" />
                </label>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow">
                    <ChefHat size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${userRole.color} flex items-center gap-1`}>
                        {userRole.icon}
                        {role?.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">• LocalChefBazaar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-amber-100 transition-colors">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    <img
                      src={user?.photoURL || "https://i.ibb.co/sample-user.jpg"}
                      alt="User"
                      className="relative w-10 h-10 rounded-full border-2 border-amber-300 shadow object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-800">{user?.displayName?.split(' ')[0] || "User"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-600 hover:to-orange-600 hover:shadow-lg transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 flex-grow"
          >
            <Outlet />
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <motion.aside
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="w-72 min-h-screen bg-gradient-to-b from-white via-amber-50 to-orange-50 border-r border-amber-100 shadow-2xl"
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-amber-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-md opacity-30"></div>
                  <div className="relative p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                    <ChefHat size={28} className="text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    LocalChefBazaar
                  </h1>
                  <span className="text-sm text-gray-600">Chef Management Portal</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className={`px-3 py-1 rounded-full ${userRole.color} text-sm font-medium flex items-center gap-2`}>
                  {userRole.icon}
                  {role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard
                </div>
                <div className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                  v2.1.0
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="p-4">
              <div className="space-y-1">
                {/* Common Links */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">MAIN NAVIGATION</h3>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <NavLink
                      to="/dashboard/profile"
                      className={({ isActive }) => (isActive ? activeMenuClass : menuItemClass)}
                    >
                      <UserCircle className="text-amber-600" size={20} />
                      <span>My Profile</span>
                    </NavLink>
                  </motion.div>
                </div>

                {/* USER Menu */}
                {role === "user" && (
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">CUSTOMER</h3>
                    {[
                      { to: "/dashboard/my-orders", icon: <Package className="text-blue-600" size={20} />, label: "My Orders" },
                      { to: "/dashboard/my-reviews", icon: <Star className="text-yellow-600" size={20} />, label: "My Reviews" },
                      { to: "/dashboard/favorites", icon: <Heart className="text-pink-600" size={20} />, label: "Favorite Meals" },
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => (isActive ? activeMenuClass : menuItemClass)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CHEF Menu */}
                {role === "chef" && (
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">CHEF TOOLS</h3>
                    {[
                      { to: "/dashboard/create-meal", icon: <PlusCircle className="text-emerald-600" size={20} />, label: "Create Meal" },
                      { to: "/dashboard/my-meals", icon: <Utensils className="text-orange-600" size={20} />, label: "My Meals" },
                      { to: "/dashboard/order-requests", icon: <FileText className="text-indigo-600" size={20} />, label: "Order Requests" },
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => (isActive ? activeMenuClass : menuItemClass)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ADMIN Menu */}
                {role === "admin" && (
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 px-4">ADMINISTRATION</h3>
                    {[
                      { to: "/dashboard/manage-users", icon: <Users className="text-purple-600" size={20} />, label: "Manage Users" },
                 
                      { to: "/dashboard/manage-requests", icon: <FileText className="text-amber-600" size={20} />, label: "Manage Requests" },
                      { to: "/dashboard/statistics", icon: <BarChart3 className="text-green-600" size={20} />, label: "Platform Statistics" },
                    ].map((item, idx) => (
                      <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => (isActive ? activeMenuClass : menuItemClass)}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Bottom Links */}
                <div className="mt-8 pt-6 border-t border-amber-100">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 hover:text-amber-800 transition-all duration-300 group"
                    >
                      <Home className="text-amber-600" size={20} />
                      <span className="font-medium">Back to Home</span>
                    </Link>
                  </motion.div>

                  {/* Mobile Logout */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="lg:hidden mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 hover:text-red-800 w-full transition-all duration-300"
                    >
                      <LogOut className="text-red-600" size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;