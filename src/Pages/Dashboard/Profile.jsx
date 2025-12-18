import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useRole from "../../Hook/useRole";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { 
  UserCircle, Mail, MapPin, Shield, UserCheck, 
  Award, ChefHat, Star, Calendar, BadgeCheck,
  Edit2, Bell, CreditCard, Package, Settings 
} from "lucide-react";

const Profile = () => {
  const { role, status, chefId } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleRequestRole = async (requestType) => {
    try {
      setLoading(true);

      const payload = { requestType };

      const res = await axiosSecure.post("/requests", payload);

      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Request Sent! 🎉",
          text: `Your request to become ${requestType} has been submitted for review!`,
          background: '#f0f9ff',
          color: '#1e40af',
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error?.response?.data?.message || "Something went wrong. Try again later.",
        background: '#fef2f2',
        color: '#991b1b',
      });
      console.error(error);
    }
  };

  const roleBadges = {
    user: { color: "bg-blue-100 text-blue-700", icon: <UserCircle size={16} />, label: "Food Lover" },
    chef: { color: "bg-emerald-100 text-emerald-700", icon: <ChefHat size={16} />, label: "Master Chef" },
    admin: { color: "bg-purple-100 text-purple-700", icon: <Shield size={16} />, label: "Platform Admin" }
  };

  const statusBadges = {
    active: { color: "bg-green-100 text-green-700", icon: <BadgeCheck size={16} /> },
    blocked: { color: "bg-red-100 text-red-700", icon: <Shield size={16} /> },
    pending: { color: "bg-yellow-100 text-yellow-700", icon: <Bell size={16} /> }
  };

  const userRole = roleBadges[role] || roleBadges.user;
  const userStatus = statusBadges[status] || statusBadges.active;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and track your culinary journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <div className="absolute inset-0 bg-white rounded-full blur-md opacity-20"></div>
                  <img
                    src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=LocalChef"}
                    alt={user?.displayName}
                    className="relative w-full h-full rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-xl font-bold text-white">{user?.displayName || "Food Explorer"}</h2>
                <p className="text-amber-100 text-sm mt-1">{user?.email}</p>
              </div>

              {/* Profile Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-amber-600">24</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">4.8</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Role & Status Badges */}
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${userRole.color}`}>
                    {userRole.icon}
                    <div>
                      <div className="font-semibold">Role</div>
                      <div className="text-sm capitalize">{role} • {userRole.label}</div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${userStatus.color}`}>
                    {userStatus.icon}
                    <div>
                      <div className="font-semibold">Status</div>
                      <div className="text-sm capitalize">{status}</div>
                    </div>
                  </div>

                  {role === "chef" && chefId && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
                      <Award className="text-amber-600" size={18} />
                      <div>
                        <div className="font-semibold">Chef ID</div>
                        <div className="text-sm font-mono">{chefId}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-lg transition-all duration-300 mb-3">
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                    <Settings size={18} />
                    Account Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white rounded-2xl p-1 mb-6 shadow-inner">
              {["overview", "orders", "reviews", "favorites"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow"
                      : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Profile Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                <div className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                  Member since Dec 2024
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                    <Mail className="text-amber-500" size={18} />
                    Contact Details
                  </h4>
                  
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email Address</div>
                        <div className="font-medium">{user?.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="text-green-600" size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Address</div>
                        <div className="font-medium">{user?.address || "123 Food Street, Dhaka"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                    <Shield className="text-amber-500" size={18} />
                    Account Information
                  </h4>
                  
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <UserCheck className="text-purple-600" size={18} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Account Type</div>
                          <div className="font-medium capitalize">{role}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${userRole.color}`}>
                        {userRole.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Star className="text-emerald-600" size={18} />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Status</div>
                          <div className="font-medium capitalize">{status}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${userStatus.color}`}>
                        {status === 'active' ? 'Verified' : status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Upgrade Section */}
            {role !== "admin" && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upgrade Your Role</h3>
                <p className="text-gray-600 mb-6">Request to elevate your experience on LocalChefBazaar</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {role !== "chef" && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 transition-all group hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                          <ChefHat className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-800 mb-2">Become a Chef</h4>
                          <p className="text-gray-600 text-sm mb-4">
                            Share your culinary creations, earn money, and build your food brand
                          </p>
                          <button
                            disabled={loading}
                            onClick={() => handleRequestRole("chef")}
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3 rounded-xl hover:from-emerald-600 hover:to-green-600 hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                          >
                            {loading ? "Processing..." : "Request Chef Role"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {role !== "admin" && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all group hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                          <Shield className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-800 mb-2">Admin Privileges</h4>
                          <p className="text-gray-600 text-sm mb-4">
                            Manage platform operations, users, and content with administrative access
                          </p>
                          <button
                            disabled={loading}
                            onClick={() => handleRequestRole("admin")}
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                          >
                            {loading ? "Processing..." : "Request Admin Role"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;