import axios from "axios";

const axiosP = axios.create({
  baseURL: "https://server12-two.vercel.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosP;
};

export default useAxiosPublic;
