import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../../Components/Loader';

const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingMeal, setEditingMeal] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Fetch meals for the logged-in chef
  // const { data: meals = [], isLoading, error } = useQuery({
  //   queryKey: ['myMeals', user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/meals/${user?.email}`);
  //     return res.data;
  //   },
  //   enabled: !!user?.email,
  // });

  const { data: meals = [], isLoading, error } = useQuery({
    queryKey: ['myMeals', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (mealId) => {
      const res = await axiosSecure.delete(`/meals/${mealId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myMeals', user?.email]);
      Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
    },
  });

  const handleDelete = (mealId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(mealId);
      }
    });
  };

  // Update mutation using PATCH
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'foodImage' && data[key]?.length > 0) {
          formData.append(key, data[key][0]); // file
        } else if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      const res = await axiosSecure.patch(`/meals/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myMeals', user?.email]);
      Swal.fire('Updated!', 'Meal has been updated.', 'success');
      setEditingMeal(null);
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate({ id: editingMeal._id, data });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading meals</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Meals</h2>

      {/* Meals Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Food Name</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Rating</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr
                key={meal._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3 border-b">{index + 1}</td>
                <td className="px-4 py-3 border-b">{meal.foodName}</td>
                <td className="px-4 py-3 border-b">${meal.price}</td>
                <td className="px-4 py-3 border-b">{meal.rating}</td>
                <td className="px-4 py-3 border-b flex gap-2">
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditingMeal(meal);
                      reset(meal);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Update Meal</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <input {...register('foodName')} placeholder="Food Name" className="border p-2 rounded" />
              <input {...register('price')} type="number" placeholder="Price" className="border p-2 rounded" />
              <input {...register('rating')} type="number" placeholder="Rating" className="border p-2 rounded" />
              <input {...register('ingredients')} placeholder="Ingredients (comma separated)" className="border p-2 rounded" />
              <input {...register('estimatedDeliveryTime')} placeholder="Delivery Time" className="border p-2 rounded" />
              <input {...register('chefExperience')} placeholder="Chef Experience" className="border p-2 rounded" />
              <input {...register('foodImage')} type="file" placeholder="Food Image" className="border p-2 rounded" />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingMeal(null)}
                  className="px-3 py-1 rounded border hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
