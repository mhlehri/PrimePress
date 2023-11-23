import { Card, Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Btn from "../../components/Btn/Btn";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { createUser, update, signO, signG } = useAuth();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    setCreating(true);
    const name = data.name;
    const image = data.photo[0];
    const email = data.email;
    const password = data.password;

    // if (password.length < 6) {
    //   return toast.error("Password should be at least 6 character!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } else if (!password.match(/[A-Z]/)) {
    //   return toast.error("Password should have at least one UpperCase!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } else if (
    //   !password.match(/[!@#\$%\^&\*\(\)\-_\+=\{\}\[\]:;'<>,\.\?/\\\|`~"]/)
    // ) {
    //   return toast.error("Password should have at least special Character!", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } else {
    const res = await axios.post(
      image_hosting_api,
      { image },
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );

    const img = res.data.data.display_url;

    if (res.data.success) {
      createUser(email, password)
        .then((res) => {
          toast.success("Successfully Registered!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          update(name, img)
            .then(
              signO()
                .then(() => {
                  navigate("/login");
                  setCreating(false);
                })
                .catch()
            )
            .catch((err) => {
              if (err) {
                console.log(err.message);
                setCreating(false);
              }
            });
        })
        .catch((err) => {
          const error = err.code;
          if (error === "auth/email-already-in-use") {
            setError("email", {
              type: "manual",
              message: `Email already in use. Please try another one`,
            });
          } else if (error) {
            let er = error.split("/")[1];
            setError("password", {
              type: "manual",
              message: `${er}`,
            });
          }
          // console.log(err.message);
          // toast.error(`${err.message}`, {
          //   position: "top-center",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
        });
    }
  };
  // };
  return (
    <div className="mx-3 ">
      <div className="mx-auto max-w-lg my-20 px-6 py-5 dark:bg-blue-gray-100 rounded-lg">
        <Card color="transparent" shadow={false} className="text-inherit">
          <h4 className="text-3xl font-bold" color="teal">
            Register
          </h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 lg:mt-6 mb-2 max-w-screen-lg "
          >
            <div className="mb-4 flex flex-col gap-6 ">
              <div>
                <Input
                  type="text"
                  size="lg"
                  name="name"
                  label="Name"
                  color="teal"
                  variant="standard"
                  {...register("name", {
                    required: "Name is required field!",
                  })}
                />
                {errors.name && (
                  <span className="text-red-800 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <Input
                  type="file"
                  size="lg"
                  name="photo"
                  {...register("photo", { required: true })}
                  label="Photo URL"
                  className="file:bg-teal-500 file:cursor-pointer cursor-pointer file:text-white file:pb-3 file:pt-1 file:px-6 file:border-0 "
                  color="teal"
                  variant="standard"
                />
                {errors.photo && (
                  <span className="text-red-800 text-xs">
                    Photo is required field!
                  </span>
                )}
              </div>
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
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 character!",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                      message:
                        "Password should be at least 1 uppercase letter and 1 special character",
                    },
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

            <Btn text="Register"></Btn>
            <p className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium underline text-teal-500">
                Login
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
              className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center  bg-transparent text-teal-600 hover:text-white hover:bg-teal-800 border-teal-800 border-2 hover:scale-105  delay-50 ease-linear`}
            >
              login with google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
