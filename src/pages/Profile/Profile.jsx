import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="h-[70vh] flex justify-center flex-col items-center">
      <img src={user?.photoURL} alt="" />
      <h3>{user?.displayName}</h3>
      <h3>{user?.email}</h3>
    </div>
  );
};

export default Profile;
