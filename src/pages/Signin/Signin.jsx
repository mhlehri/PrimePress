import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";

export function SignIn() {
  useEffect(() => {
    window.document.title = "PrimePress | SingIn";
  }, []);
  const { signIn, signG } = useAuth();
  const [logging, setLogging] = useState(false);
  const axiosP = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data, e) => {
    e.preventDefault();
    setLogging(true);
    // const form = e.target;
    const email = data.email;
    const password = data.password;
    const user = { email, password };

    signIn(email, password)
      .then(() => {
        setLogging(false);
        toast.success("Successfully Logged In!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      })
      .catch((err) => {
        setLogging(false);
        console.dir(err);
        const error = err.code;
        if (error === "auth/too-many-requests") {
          setError("password", {
            type: "manual",
            message:
              "Too many unsuccessful sign-in attempts. Please try again later.",
          });
        } else if (error) {
          let er = error.split("/")[1];
          setError("password", {
            type: "manual",
            message: `${er}`,
          });
        }
        // toast.error(`${err.message}`, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      });
  };
  return (
    <div className="mx-3">
      <div className="mx-auto max-w-lg my-20 px-6 py-5  rounded-lg ">
        <Card color="transparent" shadow={false} className="text-inherit">
          <h4 className="text-3xl font-bold">Sign In</h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 mb-2 max-w-screen-lg "
          >
            <div className="mb-4 flex flex-col gap-6">
              <div>
                <Input
                  type="email"
                  size="lg"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  label="Email"
                  color="black"
                  variant="standard"
                />
                {errors.email && (
                  <span className="text-red-800 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  {...register("password", {
                    required: "password is required!",
                  })}
                  label="Password"
                  color="black"
                  variant="standard"
                />
                {errors.password && (
                  <span className="text-red-800 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            {logging ? (
              <Button
                className={`mx-auto flex items-center gap-3  justify-center   bg-transparent   rounded-none  outline outline-2 outline-black   hover:scale-105 py-0  delay-75 ease-linear`}
              >
                <Loading />
              </Button>
            ) : (
              <Button
                type="submit"
                className={`mx-auto flex items-center gap-3  justify-center   bg-transparent hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-black  hover:text-white  rounded-none  outline outline-2    hover:outline-none hover:scale-105  delay-75 ease-linear`}
              >
                Login
              </Button>
            )}
            <p className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to="/signUp" className="underline font-semibold text-black">
                Register
              </Link>
            </p>
          </form>
          <div className="w-full mx-auto text-center">
            <hr className="border-t-2 border-black w-2/3 mx-auto py-2" />
            <Button
              onClick={() => {
                setLogging(true);
                signG()
                  .then((res) => {
                    setLogging(false);
                    navigate("/");
                    const user = {
                      name: res.user.displayName,
                      email: res.user.email,
                      img: res.user.photoURL,
                    };
                    console.log(user);
                    axiosP
                      .post("/addUser", user)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                    toast.success(`Successfully Logged In!`, {
                      position: "top-center",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  })
                  .catch();
              }}
              type="submit"
              className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center  rounded-none  bg-transparent text-black hover:text-white hover:bg-black border-black border-2 hover:scale-105  delay-50 ease-linear`}
            >
              login with google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
