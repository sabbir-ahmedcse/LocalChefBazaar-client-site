import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { Heart, ShoppingCart } from "lucide-react";
import Loader from "../Components/Loader";

const MealDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
console.log("Meal ID:", id);
 // meal ID from route

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Fetch meal data
 useEffect(() => {
  const fetchMeal = async () => { // no parameter
    try {
      const res = await axiosSecure.get(`/meals/${id}`); // backticks
      setMeal(res.data);

      const reviewRes = await axiosSecure.get(`/reviews?foodId=${id}`);
      setReviews(reviewRes.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to fetch meal data", "error");
    }
  };

  if (id) fetchMeal(); // only fetch if id exists
}, [id, axiosSecure]);


  if (!user) {
    navigate("/login");
    return null;
  }

  const handleAddFavorite = async () => {
    try {
      await axiosSecure.post("/favorites", {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.foodName,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.price,
        addedTime: new Date().toISOString(),
      });
      Swal.fire("Success!", "Meal added to favorites", "success");
    } catch (error) {
      Swal.fire("Error!", "Meal already in favorites", "error");
    }
  };

  const handleOrder = async () => {
    try {
      const totalPrice = meal.price * quantity;
      const confirm = await Swal.fire({
        title: `Confirm Order`,
        text: `Total price is $${totalPrice}. Do you want to confirm?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, order now",
      });

      if (confirm.isConfirmed) {
        await axiosSecure.post("/orders", {
          foodId: meal._id,
          mealName: meal.foodName,
          price: meal.price,
          quantity,
          chefId: meal.chefId,
          userEmail: user.email,
          userAddress: user.address,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
        });

        Swal.fire("Success!", "Order placed successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to place order", "error");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const rating = parseInt(e.target.rating.value);

    try {
      const res = await axiosSecure.post("/reviews", {
        foodId: meal._id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        rating,
        comment,
        date: new Date().toISOString(),
      });

      setReviews((prev) => [...prev, res.data]);
      Swal.fire("Success!", "Review submitted", "success");
      e.target.reset();
    } catch (error) {
      Swal.fire("Error!", "Failed to submit review", "error");
    }
  };

  if (!meal) return <Loader></Loader>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Meal Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-xl p-6">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{meal.foodName}</h2>
          <p><span className="font-semibold">Chef:</span> {meal.chefName}</p>
          <p><span className="font-semibold">Chef ID:</span> {meal.chefId}</p>
          <p><span className="font-semibold">Price:</span> ${meal.price}</p>
          <p><span className="font-semibold">Rating:</span> {meal.rating} ⭐</p>
          <p><span className="font-semibold">Ingredients:</span> {meal.ingredients.join(", ")}</p>
          <p><span className="font-semibold">Estimated Delivery:</span> {meal.estimatedDeliveryTime}</p>
          <p><span className="font-semibold">Chef Experience:</span> {meal.chefExperience}</p>

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddFavorite}
              className="btn btn-outline btn-accent flex items-center gap-2"
            >
              <Heart /> Favorite
            </button>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input input-bordered w-20"
              />
              <button
                onClick={handleOrder}
                className="btn btn-primary flex items-center gap-2"
              >
                <ShoppingCart /> Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div key={r._id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={r.reviewerImage}
                    alt={r.reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{r.reviewerName}</p>
                    <p className="text-sm text-yellow-500">{r.rating} ⭐</p>
                  </div>
                </div>
                <p>{r.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(r.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Add Review */}
        <form onSubmit={handleAddReview} className="mt-6 space-y-3">
          <h4 className="font-semibold">Add Your Review</h4>
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            placeholder="Rating (1-5)"
            required
            className="input input-bordered w-32"
          />
          <textarea
            name="comment"
            placeholder="Write your review..."
            required
            className="textarea textarea-bordered w-full"
          />
          <button type="submit" className="btn btn-success">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealDetails;
