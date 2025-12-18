import { Navigate } from "react-router";
import useRole from "../Hook/useRole";
import Loader from "../Components/Loader";

const AdminRoute = ({ children }) => {
  const { isAdmin, roleLoading } = useRole();

  if (roleLoading) {
    return <Loader />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
