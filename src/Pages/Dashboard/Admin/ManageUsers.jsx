import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../Components/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fixed: Use object syntax for useQuery
const { data: users = [], isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await axiosSecure.get("/users/all");
    return res.data;
  },
});

// if (error) {
//   return <p className="text-red-500">Failed to load users</p>;
// }

  const changeRoleMutation = useMutation({
    mutationFn: async ({ userEmail, newRole }) => {
      const res = await axiosSecure.patch("/users/role", { userEmail, newRole });
      return res.data;
    },
    // Fixed: Use object syntax for invalidateQueries
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const handleRoleChange = (email, role) => {
    Swal.fire({
      title: "Change User Role?",
      text: `Are you sure you want to make this user a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${role}`,
    }).then((result) => {
      if (result.isConfirmed) changeRoleMutation.mutate({ userEmail: email, newRole: role });
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name || "-"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="flex gap-2">
                  {user.role !== "chef" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "chef")}
                      className="btn btn-xs btn-success"
                    >
                      Make Chef
                    </button>
                  )}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user.email, "admin")}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;