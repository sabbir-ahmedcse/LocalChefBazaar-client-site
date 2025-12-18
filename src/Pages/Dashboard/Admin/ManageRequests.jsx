import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserShield, FaUserTie, FaUser, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import { FiShieldOff, FiUserX } from 'react-icons/fi';
import { MdBlock, MdCheckCircle } from 'react-icons/md';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('admin-chef'); // 'all', 'admin', 'chef', 'admin-chef'

    // Fetch all users
    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ['users', searchText, roleFilter],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res.data;
        }
    });

    // Filter users based on role
    const filteredUsers = allUsers.filter(user => {
        if (roleFilter === 'admin-chef') {
            return user.role === 'admin' || user.role === 'chef';
        } else if (roleFilter === 'all') {
            return true;
        } else {
            return user.role === roleFilter;
        }
    }).filter(user => {
        // Search filter
        if (!searchText) return true;
        const search = searchText.toLowerCase();
        return (
            user.email?.toLowerCase().includes(search) ||
            user.name?.toLowerCase().includes(search) ||
            user.role?.toLowerCase().includes(search)
        );
    });

    // Mutation to update user role
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userEmail, newRole }) => {
            return axiosSecure.patch('/users/role', { userEmail, newRole });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Role updated successfully",
                showConfirmButton: false,
                timer: 2000
            });
        },
    });

    // Mutation to update user status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ userEmail, newStatus }) => {
            return axiosSecure.patch('/users/status', { userEmail, newStatus });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Status updated successfully",
                showConfirmButton: false,
                timer: 2000
            });
        },
    });

    // Handle make admin
    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Make Admin?',
            text: `Make ${user.name || user.email} an Admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({
                    userEmail: user.email,
                    newRole: 'admin'
                });
            }
        });
    };

    // Handle make chef
    const handleMakeChef = (user) => {
        Swal.fire({
            title: 'Make Chef?',
            text: `Make ${user.name || user.email} a Chef?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make Chef!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({
                    userEmail: user.email,
                    newRole: 'chef'
                });
            }
        });
    };

    // Handle make regular user
    const handleMakeUser = (user) => {
        Swal.fire({
            title: 'Make Regular User?',
            text: `Change ${user.name || user.email} to regular User?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make User!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({
                    userEmail: user.email,
                    newRole: 'user'
                });
            }
        });
    };

    // Handle toggle status
    const handleToggleStatus = (user) => {
        const newStatus = user.status === 'active' ? 'blocked' : 'active';
        const actionText = newStatus === 'blocked' ? 'Block' : 'Activate';
        
        Swal.fire({
            title: 'Are you sure?',
            text: `${actionText} ${user.name || user.email}?`,
            icon: newStatus === 'blocked' ? 'warning' : 'info',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'blocked' ? '#d33' : '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Yes, ${actionText.toLowerCase()}!`
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({
                    userEmail: user.email,
                    newStatus
                });
            }
        });
    };

    if (isLoading) return <Loader />;

    // Count statistics
    const stats = {
        total: allUsers.length,
        admins: allUsers.filter(u => u.role === 'admin').length,
        chefs: allUsers.filter(u => u.role === 'chef').length,
        users: allUsers.filter(u => u.role === 'user').length,
        active: allUsers.filter(u => u.status === 'active').length,
        blocked: allUsers.filter(u => u.status === 'blocked').length
    };

    return (
        <div className="p-4 md:p-6">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Users</h2>
                <p className="text-gray-600 mt-2">Total Users: {stats.total}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-title">Admins</div>
                    <div className="stat-value text-primary">{stats.admins}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-title">Chefs</div>
                    <div className="stat-value text-secondary">{stats.chefs}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-title">Regular Users</div>
                    <div className="stat-value text-accent">{stats.users}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4">
                    <div className="stat-title">Active</div>
                    <div className="stat-value text-success">{stats.active}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        className="input input-bordered w-full pl-10"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                <select 
                    className="select select-bordered w-full"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="admin-chef">Admins & Chefs</option>
                    <option value="all">All Users</option>
                    <option value="admin">Admins Only</option>
                    <option value="chef">Chefs Only</option>
                    <option value="user">Regular Users</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th className="text-center">#</th>
                            <th>User Information</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover">
                                    <th className="text-center">{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.name} />
                                                    ) : (
                                                        <div className="bg-neutral text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
                                                            <span className="text-lg font-bold">
                                                                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {user.name || 'No Name'}
                                                </div>
                                                <div className="text-sm opacity-70">{user.email}</div>
                                                {user.chefId && (
                                                    <div className="text-xs opacity-50">Chef ID: {user.chefId}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' && <FaUserShield className="text-primary" />}
                                            {user.role === 'chef' && <FaUserTie className="text-secondary" />}
                                            {user.role === 'user' && <FaUser className="text-accent" />}
                                            <span className="badge badge-outline capitalize">{user.role}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} gap-1`}>
                                            {user.status === 'active' ? <MdCheckCircle /> : <MdBlock />}
                                            {user.status?.toUpperCase() || 'ACTIVE'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Role Change Buttons */}
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-xs btn-primary"
                                                    title="Make Admin"
                                                >
                                                    <FaUserShield /> Admin
                                                </button>
                                            )}
                                            
                                            {user.role !== 'chef' && (
                                                <button
                                                    onClick={() => handleMakeChef(user)}
                                                    className="btn btn-xs btn-secondary"
                                                    title="Make Chef"
                                                >
                                                    <FaUserTie /> Chef
                                                </button>
                                            )}
                                            
                                            {user.role !== 'user' && (
                                                <button
                                                    onClick={() => handleMakeUser(user)}
                                                    className="btn btn-xs btn-accent"
                                                    title="Make Regular User"
                                                >
                                                    <FaUser /> User
                                                </button>
                                            )}

                                            {/* Status Toggle Button */}
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className={`btn btn-xs ${user.status === 'active' ? 'btn-error' : 'btn-success'}`}
                                                title={user.status === 'active' ? 'Block User' : 'Activate User'}
                                            >
                                                {user.status === 'active' ? <FiUserX /> : <MdCheckCircle />}
                                                {user.status === 'active' ? 'Block' : 'Activate'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-8">
                                    <div className="text-gray-500">
                                        {searchText ? 'No matching users found' : 'No users found'}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;