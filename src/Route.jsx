import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import { SignIn } from "./pages/Signin/Signin";
import { SignUp } from "./pages/Signup/Signup";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AddArticles from "./pages/AddArticles/AddArticles";
import AllArticles from "./pages/AllArticles/AllArticles";
import Details from "./pages/Details/Details";
import AdminLayout from "./Layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout></UserLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add_articles",
        element: <AddArticles />,
      },
      {
        path: "/articles",
        element: <AllArticles />,
      },
      {
        path: "/dashboard",
        element: <AdminLayout />,
      },
      {
        path: "/subscriptions",
        element: <div>subscriptions</div>,
      },
      {
        path: "/my_articles",
        element: <div>my_articles</div>,
      },
      {
        path: "/premium_articles",
        element: <div>premium_articles</div>,
      },
      {
        path: "/profile/:user",
        element: <Profile />,
      },
      {
        path: "/article/details",
        element: <Details />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div>hoime</div>,
      },
      {
        path: "/dashboard/allusers",
        element: <div>oime</div>,
      },
      {
        path: "/dashboard/fdfd",
        element: <div>hoime</div>,
      },
      {
        path: "/dashboard/fd",
        element: <div>hoime</div>,
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
