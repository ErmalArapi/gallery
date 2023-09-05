import { Grid, NativeSelect, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { getImages } from "./api/images";
import {
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { BootstrapInput } from "./utils";
import Paginate from "./Paginate";
import "./App.css";
import { ImageProps, PaginationProps } from "./interfaces";

export const imagesList = {
  element: <Gallery />,
  loader: async ({ request: { signal } }: { request: { signal: AbortSignal } }) => {
    try {
      let { data } = await getImages({ signal });
      return data?.data.filter(
        (item: any) => item?.images?.[0]?.link.includes(".jpg")
      );
      return []
    } catch (e) {
      throw new Error("Error");
    }
  },
};

export default function Gallery() {
  let data: ImageProps[] | string = useLoaderData() as ImageProps[] | string;

  const navigate = useNavigate();
  debugger;
  if (data == "error") navigate("/500");

  const location = useLocation();

  const [pagination, setPagination] = useState<PaginationProps>({
    total: data.length,
    perPage: 12,
    currentPage: 1,
  });
  const first: ImageProps[] = [...data].slice(
    0,
    pagination.perPage
  ) as ImageProps[];

  const [photos, setPhotos] = useState<ImageProps[]>([...first]);
  const [filter, setFilter] = useState<string>("");
  const [firstPhotos, setFirstPhotos] = useState<ImageProps[]>([...first]);

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem("backPage") as string);
    if (page) {
      handlePageChange(page);
      localStorage.setItem("backPage", "null");
    }
  }, [location]);

  const order = (e: React.ChangeEvent<{ value: string }>) => {
    if (e.target.value === "oldest") {
      setPhotos((photo) => [...photo].sort((a, b) => a.datetime - b.datetime));
    }
    if (e.target.value === "newest") {
      setPhotos((prev) => [...prev].sort((a, b) => b.datetime - a.datetime));
    }
    if (e.target.value === "views") {
      setPhotos((prev) => [...prev].sort((a, b) => b.views - a.views));
    }
    if (e.target.value === "favorited") {
      setPhotos((prev) =>
        [...prev].sort((a, b) => b.favorite_count - a.favorite_count)
      );
    }
    if (e.target.value === "") {
      setPhotos([...firstPhotos]);
    }
    setFilter(e.target.value);
  };

  const handlePageChange = async (newPage: number) => {
    const newData: ImageProps[] = [...data].slice(
      newPage * pagination.perPage - pagination.perPage,
      pagination.perPage * newPage
    ) as ImageProps[];
    setPhotos(newData);
    setPagination({ ...pagination, currentPage: newPage });
    setFirstPhotos(newData);
    setFilter("");
  };

  return (
    <>
      <Grid container p={5}>
        <Grid item xs={12}>
          <Typography variant="h2">Gallery</Typography>
        </Grid>
        <Grid display="flex" alignItems="center" item xs={12}>
          <span style={{ marginRight: "5px" }}>Filter by: </span>
          <NativeSelect
            id="demo-customized-select-native"
            value={filter}
            onChange={order}
            input={<BootstrapInput />}
          >
            <option value={""}>None</option>
            <option value={"oldest"}>Oldest</option>
            <option value={"newest"}>Newest</option>
            <option value={"views"}>Most Viwed</option>
            <option value={"favorited"}>Most Favoritue</option>
          </NativeSelect>
        </Grid>
        {photos && photos.length > 0 ? (
          photos.map((photo: any) => (
            <Grid key={photo.id} mt={5} item xs={12} md={6} sm={12} lg={3}>
              <CardComponent photo={photo} page={pagination.currentPage} />
            </Grid>
          ))
        ) : (
          <Typography>No photos....</Typography>
        )}
      </Grid>
      <Grid display="flex" justifyContent={"center"} item xs={12}>
        <Paginate pagination={pagination} handlePageChange={handlePageChange} />
      </Grid>
    </>
  );
}
