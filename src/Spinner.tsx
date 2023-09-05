import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const cssSpinner = {
  position: "fixed",
  zIndex: 999,
  height: "100%",
  width: "100%",
  overflow: "show",
  margin: "auto",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, .8)",
};

export default function Spinner() {
  return (
    <Box sx={cssSpinner}>
      <CircularProgress />
    </Box>
  );
}
