import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/useAuth";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Eye, EyeOff, UploadCloud, User, Mail, Home, Lock } from "lucide-react";

const Register = () => {
  const { registerUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Image to ImgBB
      const imageFile = data.image[0];
      const formDataImg = new FormData();
      formDataImg.append('image', imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: 'POST',
          body: formDataImg,
        }
      );

      const imgData = await imgbbRes.json();

      if (!imgData.success) {
        throw new Error("Image upload failed. Please try again.");
      }

      const imageUrl = imgData.data.display_url;

      // 2. Firebase Registration
      await registerUser(data.email, data.password);

      // 3. Prepare User Info for MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        address: data.address,
        image: imageUrl,
        role: "user",
        status: "active",
        createdAt: new Date().toISOString(),
      };

      // 4. Save to MongoDB
      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId || res.data.success) {
        // Show Success Alert
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to LocalChefBazaar 🎉",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: '#f0f9ff',
          color: '#1e40af',
        });

        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: '#fef2f2',
        color: '#991b1b',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join LocalChefBazaar
          </h2>
          <p className="text-gray-600 mt-2">Create your account and start your culinary journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
            />
            {errors.name && <p className="text-sm text-red-500 mt-2 ml-1">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
            />
            {errors.email && <p className="text-sm text-red-500 mt-2 ml-1">{errors.email.message}</p>}
          </div>

          {/* ADDRESS */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Home size={16} className="text-blue-500" />
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              placeholder="123 Main Street, City, Country"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
            />
            {errors.address && <p className="text-sm text-red-500 mt-2 ml-1">{errors.address.message}</p>}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <UploadCloud size={16} className="text-blue-500" />
              Profile Image
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer bg-white/50">
              <input
                type="file"
                {...register("image", { 
                  required: "Profile image is required",
                  validate: {
                    fileSize: (files) => files[0]?.size <= 5000000 || "File size should be less than 5MB",
                    fileType: (files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type) || "Only JPEG, PNG & WebP images are allowed"
                  }
                })}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <UploadCloud className="mx-auto text-blue-400 mb-3" size={32} />
                <p className="text-gray-600">Click to upload your photo</p>
                <p className="text-sm text-gray-400 mt-1">JPEG, PNG or WebP (Max 5MB)</p>
              </label>
            </div>
            {errors.image && <p className="text-sm text-red-500 mt-2 ml-1">{errors.image.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)/,
                    message: "Password must contain letters and numbers"
                  }
                })}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-2 ml-1">{errors.password.message}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Lock size={16} className="text-blue-500" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-2 ml-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              loading 
                ? 'bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Account...
              </>
            ) : (
              <>
                <User size={18} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Sign In Here
            </Link>
          </p>
          <p className="text-xs text-center text-gray-400 mt-4">
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;