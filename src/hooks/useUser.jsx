import React from "react";
import useAuth from "./useAuth";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosS = UseAxiosSecure();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["Profile", user?.email],
    queryFn: async () => {
      const res = await axiosS.get(`/profile/${user.email}`);
      return res.data;
    },
  });
  return { data, isPending, isSuccess };
};

export default useUser;
