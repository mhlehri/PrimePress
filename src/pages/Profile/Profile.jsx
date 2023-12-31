import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useAuth from "./../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  useEffect(() => {
    window.document.title = "PrimePress | Profile";
  }, []);
  const { user, update } = useAuth();
  const [updating, setUpdating] = useState(false);
  const axiosS = UseAxiosSecure();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const name = e.target.name.value;
    const image = e.target.photo.files[0];
    if (!image) {
      update(name).then(() => {
        handleClose();
        toast.success("Successfully updated!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        axiosS
          .put(`/updateProfile?email=${user?.email}&name=${name}`)
          .then(() => {
            setUpdating(false);
          });
      });
    } else {
      try {
        const res = await axios.post(
          image_hosting_api,
          { image },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        const img = res.data.data.display_url;
        if (res.data.success) {
          update(name, img).then(() => {
            handleClose();
            axiosS
              .put(
                `/updateProfile?email=${user?.email}&name=${name}&image=${img}`
              )
              .then(() => {
                setUpdating(false);
              });

            toast.success("Successfully Updated!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
        }
      } catch (error) {
        setUpdating(false);
        console.error("Error uploading image:", error);
      }
    }
  };
  return (
    <div className="h-[80vh] flex justify-center flex-col items-center">
      <img alt="" />
      <Card className="w-72">
        <CardHeader shadow={false} floated={false} className="h-56">
          <img
            src={user?.photoURL}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography color="blue-gray" className="font-medium">
            {user?.displayName}
          </Typography>

          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {user?.email}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={handleClickOpen}
            className=" mx-auto bg-transparent w-full hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-black  hover:text-white  rounded-none  outline outline-2    hover:outline-none hover:scale-105  delay-75 ease-linear"
          >
            Update your profile
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <div className="w-[300px] px-6 py-5">
                <Card
                  color="transparent"
                  shadow={false}
                  className="text-inherit"
                >
                  <h4 className="text-3xl font-bold text-center">
                    Edit profile
                  </h4>
                  <form
                    onSubmit={handleSubmit}
                    className="mt-2 lg:mt-6 mb-2 max-w-screen-lg "
                  >
                    <div className="mb-4 flex flex-col gap-6 ">
                      <div>
                        <div className="mx-auto w-fit">
                          <label htmlFor="files">
                            <p className="font-bold text-center my-2">
                              Upload Profile
                            </p>
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
                            label="Upload your photo"
                            className="file:hidden  overflow-hidden w-28 underline  cursor-pointer "
                          />
                        </div>
                      </div>

                      <div>
                        <Input
                          type="text"
                          size="lg"
                          name="name"
                          label="Name"
                          variant="standard"
                          defaultValue={user?.displayName}
                          color="black"
                        />
                      </div>
                    </div>
                    <DialogActions
                      sx={{
                        mx: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {updating ? (
                        <Button
                          className={`mx-auto flex items-center gap-3   justify-center text-black  bg-transparent   rounded-none  outline outline-2 outline-black   hover:scale-105 py-0 `}
                        >
                          <Loading />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className={`mx-auto flex items-center gap-3  hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] justify-center   bg-transparent   rounded-none  outline outline-2 outline-black hover:outline-none hover:text-white text-black   hover:scale-105  `}
                          autoFocus
                        >
                          Update
                        </Button>
                      )}
                      <Button className="rounded-none" onClick={handleClose}>
                        Close
                      </Button>
                    </DialogActions>
                  </form>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Profile;
