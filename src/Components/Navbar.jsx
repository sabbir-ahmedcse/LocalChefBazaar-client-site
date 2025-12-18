import React, { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hook/useAuth";
import { ChefHat, Menu, X, Utensils, Home, User, LogOut, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const auth = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!auth) return null;

  const { user, logOut } = auth;

  const navLinks = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/meals", label: "Meals", icon: <Utensils size={18} /> },
    ...(user ? [{ path: "/dashboard", label: "Dashboard", icon: <User size={18} /> }] : [])
  ];

  const handleLogout = async () => {
    await logOut();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white shadow-xl">
      {/* Top Decorative Stripe */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full shadow-lg">
                <ChefHat className="text-amber-600" size={28} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">
                LocalChef<span className="text-amber-200">Bazaar</span>
              </span>
              <span className="text-xs text-amber-100 font-medium">Fresh Food, Local Chefs</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 mx-1 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white/30 backdrop-blur-sm shadow-inner"
                      : "hover:bg-white/20 hover:shadow-md"
                  }`
                }
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-md group"
                >
                  <LogIn size={18} />
                  <span className="font-semibold">Sign In</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-amber-700 font-semibold hover:bg-amber-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserPlus size={18} />
                  <span>Join Free</span>
                </NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <img
                      src={user.photoURL || "/default-user.png"}
                      alt={user.displayName || "User"}
                      className="relative w-10 h-10 rounded-full border-2 border-white/30 shadow-md object-cover group-hover:border-white/50 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">{user.displayName?.split(' ')[0] || "User"}</p>
                    <p className="text-amber-100 text-xs">Member</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-amber-600 to-red-500 border-t border-white/20 shadow-2xl">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-white/30 backdrop-blur-sm"
                      : "hover:bg-white/20"
                  }`
                }
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-white/20">
              {!user ? (
                <div className="space-y-3">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                  >
                    <LogIn size={20} />
                    <span className="font-semibold">Sign In</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white text-amber-700 font-semibold hover:bg-amber-50 transition-all"
                  >
                    <UserPlus size={20} />
                    <span>Create Account</span>
                  </NavLink>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <img
                      src={user.photoURL || "/default-user.png"}
                      alt={user.displayName || "User"}
                      className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                    />
                    <div>
                      <p className="font-bold">{user.displayName || "User"}</p>
                      <p className="text-amber-100 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-500/80 hover:bg-red-600 text-white font-semibold transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Decorative Bottom Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </nav>
  );
};

export default Navbar;