import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

const Statistics = () => {
  const data = {
    totalPaymentAmount: 10000,
    totalUsers: 1,
    pendingOrders: 30,
    deliveredOrders: 20,
  };

  const barData = [
    { name: 'Pending Orders', value: data.pendingOrders },
    { name: 'Delivered Orders', value: data.deliveredOrders },
  ];

  const pieData = [
    { name: 'Total Users', value: data.totalUsers },
    { name: 'Total Payment', value: data.totalPaymentAmount },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Platform Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h3 className="text-lg font-medium text-gray-500">Total Payment</h3>
          <p className="text-2xl font-bold text-indigo-600">
            ${data.totalPaymentAmount}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {data.totalUsers}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h3 className="text-lg font-medium text-gray-500">Pending Orders</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {data.pendingOrders}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg hover:shadow-md transition">
          <h3 className="text-lg font-medium text-gray-500">Delivered Orders</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {data.deliveredOrders}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Order Statistics
          </h3>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Platform Overview
          </h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;