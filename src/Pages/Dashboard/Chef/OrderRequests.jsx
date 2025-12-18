import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../../Components/Loader';
import ErrorPage from '../../../Components/ErrorPage';

const OrderRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch orders for chef
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orderRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/chef/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (error) return  <ErrorPage></ErrorPage>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full text-left border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Meal Name</th>
              <th className="px-4 py-2 border-b">User Email</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Order Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3 border-b">{index + 1}</td>
                <td className="px-4 py-3 border-b">{order.mealName}</td>
                <td className="px-4 py-3 border-b">{order.userEmail}</td>
                <td className="px-4 py-3 border-b">{order.quantity}</td>
                <td className="px-4 py-3 border-b">${order.price}</td>
                <td className="px-4 py-3 border-b">{order.orderStatus}</td>
                <td className="px-4 py-3 border-b">{new Date(order.orderTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderRequests;
