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
        path: "/article/details/:id",
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
        element: <Home />,
      },
      {
        path: "/dashboard/all users",
        element: <div className="w-full border-4 overflow-hidden">oime</div>,
      },
      {
        path: "/dashboard/all articles",
        element: <div>all articles</div>,
      },
      {
        path: "/dashboard/add publisher",
        element: <div>add publisher</div>,
      },
      {
        path: "/dashboard/pending articles",
        element: <div>pending articles</div>,
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
