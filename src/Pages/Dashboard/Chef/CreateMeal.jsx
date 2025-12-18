import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useAuth from '../../../Hook/useAuth'
import useAxiosSecure from '../../../Hook/useAxiosSecure'

const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY; // store your key in .env

const CreateMeal = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { mutate, isLoading } = useMutation({
    mutationFn: async (mealData) => {
      const res = await axiosSecure.post('/meals', mealData)
      return res.data
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Meal created successfully!', 'success')
      reset()
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to create meal', 'error')
    },
  })

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload image to imgbb
      const formDataImg = new FormData()
      formDataImg.append('image', data.foodImage[0])

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: 'POST',
          body: formDataImg,
        }
      )

      const imgData = await imgbbRes.json()
      if (!imgData.success) throw new Error('Image upload failed')

      const imageUrl = imgData.data.display_url

      // 2️⃣ Prepare meal data
      const mealFormData = new FormData()
      mealFormData.append('foodName', data.foodName)
      mealFormData.append('chefName', user?.displayName)
      mealFormData.append('foodImage', imageUrl) // use imgbb link
      mealFormData.append('price', data.price)
      mealFormData.append('rating', 0)
      mealFormData.append('ingredients', data.ingredients)
      mealFormData.append('estimatedDeliveryTime', data.estimatedDeliveryTime)
      mealFormData.append('chefExperience', data.chefExperience)
      mealFormData.append('chefId', user?.chefId)
      mealFormData.append('userEmail', user?.email)
      mealFormData.append('createdAt', new Date().toISOString())

      // 3️⃣ Send to server
      mutate(mealFormData)
    } catch (error) {
      console.error(error)
      Swal.fire('Error!', error.message, 'error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          className="input input-bordered w-full"
          placeholder="Food Name"
          {...register('foodName', { required: true })}
        />

        <input
          type="file"
          className="input input-bordered w-full"
          {...register('foodImage', { required: true })}
        />

        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Price"
          {...register('price', { required: true })}
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Ingredients (comma separated)"
          {...register('ingredients', { required: true })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Estimated Delivery Time"
          {...register('estimatedDeliveryTime', { required: true })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Chef Experience"
          {...register('chefExperience', { required: true })}
        />

        <input
          className="input input-bordered bg-gray-100 w-full"
          value={user?.chefId || ''}
          readOnly
        />

        <input
          className="input input-bordered bg-gray-100 w-full"
          value={user?.email || ''}
          readOnly
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? 'Creating...' : 'Create Meal'}
        </button>
      </form>
    </div>
  )
}

export default CreateMeal
