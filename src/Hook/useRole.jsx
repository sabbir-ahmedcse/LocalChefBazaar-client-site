import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState("user");     // user | chef | admin
  const [status, setStatus] = useState("active"); // active | fraud
  const [chefId, setChefId] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  // useEffect(() => {
  //   if (loading) return;

  //   if (!user?.email) {
  //     setRole("user");
  //     setStatus("active");
  //     setChefId(null);
  //     setRoleLoading(false);
  //     return;
  //   }

  //   setRoleLoading(true);

  //   axiosSecure
  //     .get(`/users/role?email=${user.email}`)
  //     .then((res) => {
  //       setRole(res.data?.role || "user");
  //       setStatus(res.data?.status || "active");
  //       setChefId(res.data?.chefId || null);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch user role:", error);
  //       setRole("user");
  //       setStatus("active");
  //       setChefId(null);
  //     })
  //     .finally(() => {
  //       setRoleLoading(false);
  //     });
  // }, [user?.email, loading, axiosSecure]);


  useEffect(() => {
    if (loading) return;

    if (!user?.email) {
      setRole("user");
      setStatus("active");
      setChefId(null);
      setRoleLoading(false);
      return;
    }

    // 👈 এই অংশটা যোগ করো (temporary testing এর জন্য)
    if (user.email === "conts@ext.com") {
      setRole("admin");
      setStatus("active");
      setRoleLoading(false);
      return; // API call করার দরকার নেই
    }
    // 👆 এখানে শেষ

    setRoleLoading(true);

    axiosSecure
      .get(`/users/role?email=${user.email}`)
      .then((res) => {
        setRole(res.data?.role || "user");
        setStatus(res.data?.status || "active");
        setChefId(res.data?.chefId || null);
      })
      .catch((error) => {
        console.error("Failed to fetch user role:", error);
        setRole("user");
      })
      .finally(() => {
        setRoleLoading(false);
      });
  }, [user?.email, loading, axiosSecure]);
  return {
    role,
    status,
    chefId,
    roleLoading,
    isAdmin: role === "admin",
    isChef: role === "chef",
    isUser: role === "user",
    isFraud: status === "fraud",
  };
};

export default useRole;
