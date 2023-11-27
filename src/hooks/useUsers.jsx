import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosP = useAxiosPublic();
  const { refetch, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosP.get("/users");
      return res.data;
    },
  });
  return { data, refetch };
};

export default useUsers;
