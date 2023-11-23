import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import { SignIn } from "./pages/Signin/Signin";
import { SignUp } from "./pages/Signup/Signup";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout></UserLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile/:user",
        element: <Profile></Profile>,
      },
    ],
  },
  { path: "/login", element: <SignIn></SignIn> },
  { path: "/signUp", element: <SignUp></SignUp> },
]);

const Route = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Route;
