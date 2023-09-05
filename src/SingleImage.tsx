import React from "react";
import { getImages } from "./api/images";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation } from "react-router-dom";
import { ImageProps, SingleImageRequest } from "./interfaces";


export const singleImage = {
  element: <SingleImage />,
  loader: async ({ request: { signal }, params }: SingleImageRequest) => {
    let { data } = await getImages({ signal });
    return data?.data.find((item:ImageProps) => item?.id == params.id) || null;
  },
};

export default function SingleImage() {
  let data: any = useLoaderData();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");

  const [photo, setPhoto] = React.useState(data);

  const navigate = useNavigate();

  const goBackWithParameters = () => {
    localStorage.setItem("backPage", page as string);
    navigate(`/images`);
  };

  return (
    <>
      <Grid container>
        <ArrowBackIcon onClick={goBackWithParameters} />
        <Grid item display="flex" height="100%" justifyContent="center" xs={12}>
          <Card sx={{ maxWidth: 800, height: "100%" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={photo?.title}
              subheader={moment(photo?.datetime).format("MMMM DD YYYY")}
            />
            <CardMedia
              component="img"
              height="100%"
              image={
                photo?.images?.length > 0
                  ? photo?.images[0].link
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              sx={{ cursor: "pointer" }}
              referrerPolicy="no-referrer"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {photo?.favorite_count}
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
