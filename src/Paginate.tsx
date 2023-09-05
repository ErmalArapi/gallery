import React from "react";
import { Pagination } from "@mui/material";
import { PaginateProps } from "./interfaces";

export default function Paginate({
  pagination,
  handlePageChange,
}: PaginateProps) {
  return (
    <Pagination
      sx={{ display: "flex", justifyContent9: "center", cursor: "pointer" }}
      count={Math.ceil(pagination.total / pagination.perPage)}
      page={Number(pagination.currentPage)}
      onChange={(_, newPage) => handlePageChange(newPage)}
      color="primary"
    />
  );
}
