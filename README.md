LocalChefBazaar - Marketplace for Local Home-Cooked Meals
Project Overview
LocalChefBazaar is a modern online platform that connects home cooks with people looking for fresh, homemade food. The platform allows customers to explore daily menus, check chef availability, place orders, make secure payments, and track orders in real-time. For home cooks, it provides an easy way to earn money from their kitchen without needing a physical restaurant.

Live URL 
Live Site URL :  https://localchefbazaar-f8bdd.web.app

Key Features
User Authentication: Secure login/registration using Firebase Authentication

Three User Roles: Admin, Chef, and Customer with role-based permissions

Meal Management: Chefs can create, update, and delete their meals

Order System: Customers can place orders with real-time status tracking

Review System: Customers can leave reviews and ratings for meals

Favorite Meals: Users can save favorite meals for quick access

Payment Integration: Stripe payment gateway for secure transactions

Dashboard: Separate dashboards for Admin, Chef, and Customer

Real-time Updates: Order status updates in real-time

Responsive Design: Fully responsive design for all devices

Technology Stack
Frontend
React.js with Vite

React Router DOM for routing

React Hook Form for form handling

Axios for API requests

Framer Motion for animations

Recharts for data visualization

Tailwind CSS for styling

SweetAlert2 for notifications

Backend
Node.js with Express.js

MongoDB with Mongoose ODM

JWT for authentication

Firebase Admin SDK for authentication

Stripe for payment processing

CORS for cross-origin requests

Installation & Setup
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account or local MongoDB

Firebase project for authentication

Stripe account for payments

Frontend Setup
bash
cd client
npm install

npm start
API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

POST /api/auth/logout - User logout

Meals
GET /api/meals - Get all meals (with pagination)

GET /api/meals/:id - Get single meal details

POST /api/meals - Create new meal (Chef only)

PUT /api/meals/:id - Update meal (Chef only)

DELETE /api/meals/:id - Delete meal (Chef only)

Orders
POST /api/orders - Create new order

GET /api/orders/user - Get user orders

GET /api/orders/chef - Get chef orders

PUT /api/orders/:id/status - Update order status

Reviews
POST /api/reviews - Add review

GET /api/reviews/meal/:mealId - Get meal reviews

GET /api/reviews/user - Get user reviews

PUT /api/reviews/:id - Update review

DELETE /api/reviews/:id - Delete review

Favorites
POST /api/favorites - Add to favorites

GET /api/favorites/user - Get user favorites

DELETE /api/favorites/:id - Remove from favorites

Admin
GET /api/admin/users - Get all users

PUT /api/admin/users/:id/status - Update user status

GET /api/admin/requests - Get all role requests

PUT /api/admin/requests/:id - Update request status

GET /api/admin/stats - Get platform statistics

Database Schema
User Schema
javascript
{
  name: String,
  email: String,
  image: String,
  address: String,
  role: String, // 'user', 'chef', 'admin'
  status: String, // 'active', 'fraud'
  chefId: String, // Generated for chefs
  createdAt: Date
}
Meal Schema
javascript
{
  foodName: String,
  chefName: String,
  foodImage: String,
  price: Number,
  rating: Number,
  ingredients: [String],
  estimatedDeliveryTime: String,
  chefExperience: String,
  chefId: String,
  userEmail: String,
  deliveryArea: String,
  createdAt: Date
}
Order Schema
javascript
{
  foodId: ObjectId,
  mealName: String,
  price: Number,
  quantity: Number,
  chefId: String,
  userEmail: String,
  userAddress: String,
  orderStatus: String, // 'pending', 'accepted', 'delivered', 'cancelled'
  paymentStatus: String, // 'pending', 'paid'
  orderTime: Date
}
Deployment Notes
Frontend deployed on /Vercel

Backend deployed on Render/Railway

MongoDB hosted on MongoDB Atlas

Firebase Authentication configured

CORS properly configured

Environment variables secured

Commit Strategy
Client Side: 20+ meaningful commits with descriptive messages

Server Side: 12+ meaningful commits with descriptive messages

Clear commit history showing development progress

Security Measures
JWT authentication with HTTP-only cookies

Environment variables for sensitive data

Input validation on all forms

Protected routes based on user roles

Secure API endpoints with middleware


Challenges & Solutions
JWT Authentication: Implemented secure token-based authentication with HTTP-only cookies

Role-Based Access: Created middleware to check user roles for protected routes

Real-time Updates: Used React state management for immediate UI updates

Payment Integration: Integrated Stripe for secure payment processing

Image Upload: Implemented image upload functionality for meal images

Future Enhancements
Real-time chat between customers and chefs

Push notifications for order updates

Advanced search and filtering options

Meal subscription plans

Mobile app development

Multi-language support

License
This project is developed for assessment purposes.

Contact
For any queries regarding this project, please contact the development team.