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
import PremiumArticles from "./pages/PremiumArticles/PremiumArticles";
import DHome from "./pages/Dashboard/DHome/DHome";
import DAllUsers from "./pages/Dashboard/DAllUsers/DAllUsers";
import DAllArticles from "./pages/Dashboard/DAllArticles/DAllArticles";
import DAddPublisher from "./pages/Dashboard/DAddPublisher/DAddPublisher";
import MyArticles from "./pages/MyArticles/MyArticles";

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
        element: <MyArticles />,
      },
      {
        path: "/premium_articles",
        element: <PremiumArticles />,
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
        element: <DHome />,
      },
      {
        path: "/dashboard/all users",
        element: <DAllUsers />,
      },
      {
        path: "/dashboard/all articles",
        element: <DAllArticles />,
      },
      {
        path: "/dashboard/add publisher",
        element: <DAddPublisher />,
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
