import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Btn from "../../components/Btn/Btn";
import { PencilIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { user } = useAuth();
  const axiosS = UseAxiosSecure();
  const { data: profile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosS.get(`/edit/${user.email}`);
      return res.data;
    },
  });
  console.log(profile);
  return (
    <div className="h-[80vh] flex justify-center flex-col items-center">
      <img alt="" />
      <Card className="w-72">
        <CardHeader shadow={false} floated={false} className="h-56">
          <img
            src={profile?.img}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography color="blue-gray" className="font-medium">
            Apple AirPods
          </Typography>

          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {profile?.email}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Btn text={`Update your profile`}></Btn>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
