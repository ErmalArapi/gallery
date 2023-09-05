import React from "react";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import { imagesList } from "./Gallery";
import Spinner from "./Spinner";
import { singleImage } from "./SingleImage";
import ServerError from "./ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    errorElement: <ServerError />,

    children: [
      {
        path: "/",
        element: <Navigate to="/images" replace />,
      },
      {
        path: "images",
        children: [
          {
            index: true,
            ...imagesList,
          },
          {
            path: ":id",
            ...singleImage,
          },
        ],
      },
    ],
  },
  {
    path: "500",
    element: <ServerError />,
  },
]);

function NavbarLayout() {
  const routeError = useRouteError();
  debugger;
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <>
      {isLoading && <Spinner />}
      <Outlet />
    </>
  );
}
