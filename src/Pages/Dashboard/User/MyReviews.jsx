import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hook/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../../Components/Loader';
import ErrorPage from '../../../Components/ErrorPage';
import { AlertCircle, Star, MessageSquare, Trash2, ExternalLink } from 'lucide-react';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* ---------------- Debugging ---------------- */
  console.log('🟡 Current User Email:', user?.email);
  console.log('🟡 AxiosSecure:', axiosSecure);

  /* ---------------- Fetch My Reviews ---------------- */
  const { 
    data: reviews = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['myReviews', user?.email],
    queryFn: async () => {
      try {
        console.log('🟡 Fetching reviews for email:', user?.email);
        const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
        console.log('🟡 Reviews response:', res.data);
        return res.data;
      } catch (err) {
        console.error('🟡 Error fetching reviews:', err);
        console.log('🟡 Error response:', err.response?.data);
        console.log('🟡 Error status:', err.response?.status);
        throw err;
      }
    },
    enabled: !!user?.email,
    retry: 1,
  });

  /* ---------------- Delete Review ---------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myReviews', user?.email]);
      Swal.fire({
        title: 'Deleted!',
        text: 'Review deleted successfully',
        icon: 'success',
        background: '#f0f9ff',
        color: '#1e40af',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete review',
        icon: 'error',
        background: '#fef2f2',
        color: '#991b1b',
      });
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Review?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#fef3c7',
      color: '#92400e',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loader />;
  
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-500" size={24} />
            <h3 className="text-lg font-bold text-red-800">Failed to Load Reviews</h3>
          </div>
          <div className="space-y-2 text-sm text-red-700">
            <p><strong>Error:</strong> {error.message}</p>
            <p><strong>Status:</strong> {error.response?.status}</p>
            <p><strong>Message:</strong> {error.response?.data?.message || 'Unknown error'}</p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Reviews</h1>
          <p className="text-gray-600">All your culinary feedback and ratings in one place</p>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Review Statistics</h3>
              <p className="text-gray-600">Manage and track all your meal reviews</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{reviews.length}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : '0.0'}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {reviews.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <MessageSquare className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't shared your culinary experiences yet. Try some meals and share your feedback!
              </p>
              <button
                onClick={() => window.location.href = '/meals'}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-lg transition-all duration-300"
              >
                <ExternalLink className="inline mr-2" size={18} />
                Explore Meals
              </button>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">#</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Meal</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Rating</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Review</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reviews.map((review, index) => (
                      <tr key={review._id} className="hover:bg-amber-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-700">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">{review.foodName}</div>
                          <div className="text-sm text-gray-500">{review.foodId?.slice(0, 8)}...</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                              />
                            ))}
                            <span className="ml-2 font-bold text-gray-700">{review.rating}.0</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-gray-700 line-clamp-2">{review.comment}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(review._id)}
                            disabled={deleteMutation.isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-300 disabled:opacity-70"
                          >
                            <Trash2 size={16} />
                            {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4 p-4">
                {reviews.map((review, index) => (
                  <div key={review._id} className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-4 border border-amber-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-gray-800">{review.foodName}</div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-sm font-bold">{review.rating}.0</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 text-sm">{review.comment}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && reviews.length > 0 && (
          <div className="mt-8 p-4 bg-gray-900 text-gray-300 rounded-xl text-sm font-mono">
            <div className="mb-2">🛠️ Debug Info:</div>
            <div>Total Reviews: {reviews.length}</div>
            <div>User Email: {user?.email}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;