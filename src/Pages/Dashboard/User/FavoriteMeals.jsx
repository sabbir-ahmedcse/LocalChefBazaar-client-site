import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader';

const FavoriteMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite meals
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await axiosSecure.get(`/favorites/${user.email}`);
        setFavorites(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, axiosSecure]);

  // Delete favorite
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this meal from favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, remove it',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/favorites/${id}`);
        setFavorites((prev) => prev.filter((item) => item._id !== id));
        Swal.fire('Removed!', 'Meal removed from favorites.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to remove favorite.', 'error');
      }
    }
  };

  if (!user) return <p className="text-center py-10">Please login to see your favorite meals.</p>;
  if (loading) return <Loader></Loader>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">My Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite meals yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Meal Name</th>
                <th>Chef Name</th>
                <th>Price</th>
                <th>Date Added</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((fav, index) => (
                <tr key={fav._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{fav.mealName}</td>
                  <td>{fav.chefName}</td>
                  <td>${fav.price}</td>
                  <td>
                    {fav.addedTime
                      ? new Date(fav.addedTime).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default FavoriteMeals;
