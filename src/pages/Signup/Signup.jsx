import { Card, Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Btn from "../../components/Btn/Btn";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export function SignUp() {
  const axiosP = useAxiosPublic();
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
    console.log(image);

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
        .then(() => {
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
                  const user = { name, email, img };
                  console.log(user);
                  axiosP
                    .post("/addUser", user)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => console.log(err));
                  navigate("/login");
                  setCreating(false);
                })
                .catch()
            )
            .catch((err) => {
              if (err) {
                toast.error(`${err.code}`, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
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
          console.log(err.message);
          toast.error(`${err.code}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };
  // };
  return (
    <div className="mx-3 ">
      <div className="mx-auto max-w-lg my-20 px-6 py-5  rounded-lg">
        <Card color="transparent" shadow={false} className="text-inherit">
          <h4 className="text-3xl font-bold">Register</h4>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 lg:mt-6 mb-2 max-w-screen-lg "
          >
            <div className="mb-4 flex flex-col gap-6 ">
              <div>
                <div className="mx-auto w-fit">
                  <label htmlFor="files">
                    <p className="font-bold text-center my-2">Upload Profile</p>
                    <figure className="bg-black p-2 rounded-full w-fit  mx-auto cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="white"
                        viewBox="0 0 20 17"
                      >
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                      </svg>
                    </figure>
                  </label>
                  <input
                    id="files"
                    type="file"
                    size="lg"
                    name="photo"
                    {...register("photo", { required: true })}
                    label="Upload your photo"
                    className="file:hidden  overflow-hidden w-28 underline  cursor-pointer "
                  />
                </div>
                {errors.photo && (
                  <p className="text-red-800 text-xs text-center">
                    Photo is required field!
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  size="lg"
                  name="name"
                  label="Name"
                  variant="standard"
                  color="black"
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
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 character!",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).*$/,
                      message:
                        "Password should be at least 1 uppercase letter, 1 special character & 1 Number",
                    },
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
            <Button
              type="submit"
              className={`mx-auto flex items-center gap-3  justify-center   bg-transparent hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-black  hover:text-white  rounded-none  outline outline-2    hover:outline-none hover:scale-105  delay-75 ease-linear`}
            >
              {creating ? <Loading /> : "Register"}
            </Button>
            <p className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold underline text-black">
                Login
              </Link>
            </p>
          </form>
          <div className="w-full mx-auto text-center">
            <hr className="border-t-2 border-black w-2/3 mx-auto py-2" />

            <Button
              onClick={() => {
                setCreating(true);
                signG()
                  .then((res) => {
                    setCreating(false);
                    navigate("/");
                    console.log(res.user.displayName);
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
              className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center  bg-transparent text-black hover:text-white hover:bg-black border-black rounded-none border-2 hover:scale-105  delay-50 ease-linear`}
            >
              login with google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
