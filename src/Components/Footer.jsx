import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaUtensils, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, 
  FaClock, FaCreditCard, FaShieldAlt, FaTruck 
} from 'react-icons/fa';
import { ChefHat, Mail, Phone, MapPin, Clock, CreditCard, Shield, Truck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Top Gradient Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 py-8">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🍽️ Taste the Difference with Local Chefs
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            Fresh ingredients, authentic recipes, and culinary passion delivered to your doorstep
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            
            {/* Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <ChefHat className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    LocalChefBazaar
                  </h2>
                  <p className="text-sm text-gray-400">Culinary Excellence Delivered</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting food lovers with talented local chefs. Experience homemade meals crafted with passion, delivered fresh to your home.
              </p>
              
              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <FaUtensils className="text-amber-400" /> Follow Our Journey
                </h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/MdSabbirRumon2"
                    target='blank' 
                    className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110 group"
                  >
                    <FaFacebookF className="text-white group-hover:text-white" size={18} />
                  </a>
                  <a 
                    target='blank' 
                    href="#" 
                    className="p-3 bg-gray-800 hover:bg-sky-400 rounded-full transition-all duration-300 hover:scale-110 group"
                  >
                    <FaTwitter className="text-white group-hover:text-white" size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/sa_bb_ir_ah_me_d/?hl=en" 
                    target='blank' 

                    className="p-3 bg-gray-800 hover:bg-pink-500 rounded-full transition-all duration-300 hover:scale-110 group"
                  >
                    <FaInstagram className="text-white group-hover:text-white" size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/sabbir-ahmedcse/" 
                    target='blank' 

                    className="p-3 bg-gray-800 hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-110 group"
                  >
                    <FaLinkedinIn className="text-white group-hover:text-white" size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-700 flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 w-1 h-6 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Explore Meals', href: '#' },
                  { name: 'Meet Our Chefs', href: '#' },
                  { name: 'How It Works', href: '#' },
                  { name: 'Gift Cards', href: '#' },
                  { name: 'Become a Chef', href: '#' },
                  { name: 'FAQs', href: '#' },
                  { name: 'Careers', href: '#' },
                  { name: 'Blog', href: '#' },
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-700 flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 w-1 h-6 rounded-full"></span>
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
                    <MapPin className="text-amber-400 group-hover:text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-400 text-sm">123 Culinary Street, Food District</p>
                    <p className="text-gray-400 text-sm">Dhaka 1212, Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
                    <Phone className="text-amber-400 group-hover:text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-400 text-sm">+880 1234 567890</p>
                    <p className="text-gray-400 text-sm">+880 9876 543210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-amber-600 transition-colors">
                    <Mail className="text-amber-400 group-hover:text-white" size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-400 text-sm">support@localchefbazaar.com</p>
                    <p className="text-gray-400 text-sm">orders@localchefbazaar.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Hours */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-gray-700 flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 w-1 h-6 rounded-full"></span>
                Our Features
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Shield className="text-emerald-400" size={18} />, text: '100% Safe & Secure' },
                  { icon: <Truck className="text-blue-400" size={18} />, text: 'Fast Delivery' },
                  { icon: <CreditCard className="text-purple-400" size={18} />, text: 'Easy Payments' },
                  { icon: <Clock className="text-amber-400" size={18} />, text: '24/7 Support' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Clock className="text-amber-400" size={18} />
                  Working Hours
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-amber-400">Special Orders Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated!</h3>
                <p className="text-gray-400">Subscribe to get special offers and chef announcements</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-6 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-grow"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-6 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} LocalChefBazaar. All culinary rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#"  className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#"  className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</a>
              <a href="#"  className="text-gray-400 hover:text-amber-400 transition-colors">Sitemap</a>
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Live Support Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
    </footer>
  );
};

export default Footer;