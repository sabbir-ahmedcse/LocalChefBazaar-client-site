import React from 'react';
import { motion } from 'framer-motion';

const HomeSection = () => {
  const cardData = [
    { title: 'Fresh Meals', description: 'Enjoy daily fresh homemade meals from local chefs.', color: 'from-green-400 to-green-500' },
    { title: 'Fast Delivery', description: 'Get your meals delivered quickly and safely to your doorstep.', color: 'from-yellow-400 to-yellow-500' },
    { title: 'Top Rated Chefs', description: 'Our chefs are highly rated and skilled to make delicious meals.', color: 'from-pink-400 to-pink-500' },
  ];

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-indigo-100 py-20 px-6 rounded-3xl my-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-gray-900 mb-8"
        >
          Welcome to LocalChefBazaar
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-700 text-lg mb-12"
        >
          Discover delicious homemade meals prepared by local chefs. Fresh, healthy, and delivered to your doorstep.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, y: -5, boxShadow: '0px 20px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`bg-gradient-to-br ${card.color} rounded-3xl shadow-xl p-8 cursor-pointer text-left`}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-white text-base">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
