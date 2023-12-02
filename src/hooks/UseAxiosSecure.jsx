import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const axiosS = axios.create({
  baseURL: "https://server12-two.vercel.app",
  withCredentials: true,
});
const UseAxiosSecure = () => {
  const signO = useAuth();

  useEffect(() => {
    axiosS.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (
          err.response?.status === 404 ||
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          signO()
            .then(() => {
              toast.success("Successfully Logged Out!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            })
            .catch((err) => console.log(err));
        }
      }
    );
  }, []);
  return axiosS;
};

export default UseAxiosSecure;
