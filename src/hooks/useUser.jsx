import React from "react";
import useAuth from "./useAuth";
import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosS = UseAxiosSecure();
  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["Profile", user?.email],
    queryFn: async () => {
      const res = await axiosS.get(`/profile/${user.email}`);
      return res.data;
    },
  });
  console.log("eta valo  na vai ", data);
  if (data?.role !== "admin") {
    if (data?.Premium) {
      if (data?.premium_Exp) {
        if (data?.premium_Exp < new Date().getTime()) {
          axiosS
            .put(`/updateUserPremium/${user?.email}`, {
              isPremium: false,
              _Exp: null,
            })
            .then(() => {
              console.log("okkkk bye");
            });
        }
      }
    }
  }
  return { data, isPending, isSuccess, refetch };
};

export default useUser;
