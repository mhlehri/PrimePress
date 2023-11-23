import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Btn from "../../components/Btn/Btn";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

export function SignIn() {
  const { signIn, signG } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data, e) => {
    e.preventDefault();
    // const form = e.target;
    const email = data.email;
    const password = data.password;
    const user = { email, password };

    signIn(email, password)
      .then(() => {
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
                  color="teal"
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
                  color="teal"
                  variant="standard"
                />
                {errors.password && (
                  <span className="text-red-800 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <Btn text="Log In"></Btn>
            <p className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="underline font-medium text-teal-500"
              >
                Register
              </Link>
            </p>
          </form>
          <div className="w-full mx-auto text-center">
            <hr className="border-t-2 border-teal-800 w-2/3 mx-auto py-2" />
            <Button
              onClick={() =>
                signG()
                  .then(() => {
                    navigate("/");
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
                  .catch()
              }
              type="submit"
              className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center   bg-transparent text-teal-600 hover:text-white hover:bg-teal-800 border-teal-800 border-2 hover:scale-105  delay-50 ease-linear`}
            >
              login with google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
