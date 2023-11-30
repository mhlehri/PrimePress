import { Navigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import useAuth from "./hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const { data: admin, isPending, isSuccess } = useUser();
  if (isPending) {
    return <div>loading...</div>;
  }

  if (isSuccess && user && admin?.role === "admin") {
    return children;
  }

  return <Navigate to="/@#@#Hacked" />;
};

export default AdminRoute;
