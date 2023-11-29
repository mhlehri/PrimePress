import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useUser from "./hooks/useUser";

const PremiumRoute = ({ children }) => {
  const { user } = useAuth();
  const { data: userInfo, isPending } = useUser();
  if (isPending) {
    return <p>Loading...</p>;
  }
  if (user && userInfo?.Premium) {
    return children;
  }
  return <Navigate to="/" />;
};

export default PremiumRoute;
