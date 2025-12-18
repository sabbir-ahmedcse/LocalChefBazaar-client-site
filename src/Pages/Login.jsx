import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hook/useAuth";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Mail, Lock, ChefHat, ArrowRight } from "lucide-react";

const Login = () => {
  const { signInUser, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to LocalChefBazaar 👨‍🍳",
        timer: 1500,
        showConfirmButton: false,
        background: '#f0f9ff',
        color: '#1e40af',
      });

      // Navigate to home
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
        background: '#fef2f2',
        color: '#991b1b',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Your Password",
      input: "email",
      inputLabel: "Enter your registered email address",
      inputPlaceholder: "you@example.com",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: "Send Reset Link",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      backdrop: 'rgba(0,0,0,0.4)',
      preConfirm: async (email) => {
        try {
          await forgotPassword(email);
          return email;
        } catch (error) {
          Swal.showValidationMessage(`Error: ${error.message}`);
          return false;
        }
      },
    });

    if (email) {
      Swal.fire({
        icon: "success",
        title: "Check Your Email!",
        text: "We've sent password reset instructions to your email",
        background: '#f0f9ff',
        color: '#1e40af',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            <ChefHat className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to your LocalChefBazaar account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="group">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={16} className="text-blue-500" />
                Password
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 placeholder-gray-400 outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me - Optional */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Remember me for 30 days
            </label>
          </div>

          {/* Login Button */}
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
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-white to-blue-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login - Optional */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-3 px-4 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="py-3 px-4 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.31-2.33 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div> */}
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Create an account
            </NavLink>
          </p>
          <p className="text-xs text-center text-gray-400 mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;