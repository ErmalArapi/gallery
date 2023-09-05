import React from "react";
import {
  Navigate,
  Outlet,
  RouteObject,
  createBrowserRouter,
  useNavigation,
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
          } as RouteObject ,
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
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <>
      {isLoading && <Spinner />}
      <Outlet />
    </>
  );
}
