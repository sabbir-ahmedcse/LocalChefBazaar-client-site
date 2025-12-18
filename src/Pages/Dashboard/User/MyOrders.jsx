import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Loader";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Meal Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th>Payment</th>
                <th>Order Time</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">
                    {order.mealName}
                  </td>

                  <td>{order.quantity}</td>

                  <td className="font-medium">
                    ${order.price * order.quantity}
                  </td>

                  <td>
                    <span className="badge badge-outline capitalize">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.paymentStatus || "pending"}
                    </span>
                  </td>

                  <td className="text-sm text-gray-500">
                    {new Date(order.orderTime).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
