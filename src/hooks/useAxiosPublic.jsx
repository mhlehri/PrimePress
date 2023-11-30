import axios from "axios";

const axiosP = axios.create({
  baseURL: "https://primepress.netlify.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosP;
};

export default useAxiosPublic;
