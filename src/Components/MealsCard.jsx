import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaFire,
  FaLeaf,
  FaShoppingCart,
  FaEye,
} from 'react-icons/fa';

import useAxiosSecure from '../Hook/useAxiosSecure';
import Loader from '../Components/Loader';
import { Link } from 'react-router';

const MealsCard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['allMeals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals?limit=6');
      return res.data;
    },
  });

  const meals = data?.meals || [];

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading meals</p>
      </div>
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'spicy':
      case 'hot':
        return <FaFire className="text-red-500" />;
      case 'healthy':
      case 'vegetarian':
        return <FaLeaf className="text-green-500" />;
      default:
        return <FaStar className="text-amber-500" />;
    }
  };

  return (
    <div className="py-12 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-2 rounded-full mb-4">
            <FaStar />
            <span className="font-semibold">Fresh from Local Kitchens</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Today's <span className="text-amber-500">Special</span> Meals
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover delicious homemade meals prepared by talented local chefs
          </p>
        </motion.div>

        {/* Meals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {meals.map((meal) => (
            <motion.div
              key={meal._id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-xl font-bold">{meal.foodName}</h3>
                  <span className="font-bold text-amber-500">
                    ${meal.price}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-amber-500" /> {meal.rating || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock /> {meal.estimatedDeliveryTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> Local
                  </span>
                </div>

                {/* Ingredients */}
                {meal.ingredients && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to={`/meals/${meal._id}`}
                    className="flex-1 bg-amber-500 text-white py-2 rounded-lg text-center font-semibold"
                  >
                    <FaEye className="inline mr-1" /> View
                  </Link>

                  <button className="p-3 border rounded-lg text-amber-600">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MealsCard;