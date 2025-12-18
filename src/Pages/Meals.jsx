import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; // react-router-dom ঠিক করা
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import useAxiosSecure from '../Hook/useAxiosSecure';
import Loader from '../Components/Loader';

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const limit = 9;

  const { data, isLoading, error } = useQuery({
    queryKey: ['meals', page, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meals?page=${page}&limit=${limit}&sort=${sort}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load meals</div>;

  const meals = data?.meals || [];
  const totalPages = data?.totalPages || 0;

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold">All Meals</h2>
        <select
          className="select select-bordered w-full md:w-60"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Meals Grid */}
      {meals.length === 0 ? (
        <p className="text-center text-gray-500">No meals found</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {meals.map((meal) => (
            meal?._id && (
              <motion.div
                key={meal._id}
                variants={cardVariants}
                whileHover={{ y: -6, boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}
                className="bg-white rounded-2xl overflow-hidden border shadow hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{meal.foodName}</h3>
                    <span className="font-bold text-amber-500">${meal.price}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
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

                  {/* Button */}
                  <Link
                    to={`/meals/${meal._id}`}
                    className="block bg-amber-500 text-white py-2 rounded-lg text-center font-semibold hover:bg-amber-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center flex-wrap gap-2 mt-10">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`btn btn-sm ${page === num + 1 ? 'btn-primary' : 'btn-outline'}`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
