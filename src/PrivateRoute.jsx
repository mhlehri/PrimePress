import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>loading...</div>;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
