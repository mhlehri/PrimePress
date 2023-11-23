import React, { useContext } from "react";
import { AuthContext } from "../components/Authprovider/AuthProvider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
