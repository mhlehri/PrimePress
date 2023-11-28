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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        element: (
          <PrivateRoute>
            <AddArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/articles",
        element: <AllArticles />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminLayout />,
          </PrivateRoute>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <PrivateRoute>
            <div>sub</div>
          </PrivateRoute>
        ),
      },
      {
        path: "/my_articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/premium_articles",
        element: (
          <PrivateRoute>
            <PremiumArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/:user",
        element: (
          <PrivateRoute>
            <Profile />,
          </PrivateRoute>
        ),
      },
      {
        path: "/article/details/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DHome />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all users",
        element: (
          <AdminRoute>
            <DAllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all articles",
        element: (
          <AdminRoute>
            <DAllArticles />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add publisher",
        element: (
          <AdminRoute>
            <DAddPublisher />
          </AdminRoute>
        ),
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
