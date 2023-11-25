import axios from "axios";

const axiosP = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosP;
};

export default useAxiosPublic;
