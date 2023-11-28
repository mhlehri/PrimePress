import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllPublishers = () => {
  const axiosP = useAxiosPublic();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosP.get("/allPublishers");
      return res.data;
    },
  });
  return { data, isPending, isError, refetch };
};

export default useAllPublishers;
