import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaShippingFast, FaStar, FaHeart, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { GiKnifeFork, GiCookingPot } from 'react-icons/gi';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen rounded-2xl shadow-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg"
          >
            <FaStar className="animate-pulse" />
            <span className="font-semibold">Fresh Home-Cooked Meals</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Taste the Love of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Homemade
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-amber-200/50 -rotate-1"></span>
              </span>{' '}
              Cuisine
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              Discover authentic homemade meals prepared with care by local chefs in your community. 
              From traditional recipes to modern twists, experience the comfort of home-cooked food delivered to your doorstep.
            </motion.p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <FaUtensils className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Delicious Meals</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 group"
            >
              <GiCookingPot className="group-hover:scale-110 transition-transform duration-300" />
              <span>Become a Chef</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8"
          >
            {[
              { number: "500+", label: "Local Chefs", icon: <GiKnifeFork /> },
              { number: "5,000+", label: "Meals Served", icon: <FaCheckCircle /> },
              { number: "4.8★", label: "Average Rating", icon: <FaStar /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-orange-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Food Images */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Main Food Card */}
          <motion.div
            whileHover={{ y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Homemade Pizza"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Homemade Pizza</h3>
                    <p className="text-amber-200">By Chef Maria</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">$12.99</span>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Food Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -10 }}
            className="absolute -bottom-6 -left-6 w-48 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Fresh Salad"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-gray-900">Fresh Garden Salad</h4>
              <p className="text-sm text-gray-600 mt-1">Healthy & Fresh</p>
            </div>
          </motion.div>

          {/* Delivery Badge */}
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ rotate: 5 }}
            className="absolute -top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <FaShippingFast className="text-2xl" />
            </div>
            <div>
              <div className="font-bold">Fast Delivery</div>
              <div className="text-sm opacity-90">30-45 mins</div>
            </div>
          </motion.div>

          {/* Chef Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-20 -right-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-orange-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                CM
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Chef Maria</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <FaStar className="text-amber-400" />
                  4.9 Rating • Italian Specialist
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-gray-500 text-sm">Scroll to explore</div>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-300 rounded-full"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-orange-300 rounded-full"
      ></motion.div>
    </div>
  );
};

export default Banner;