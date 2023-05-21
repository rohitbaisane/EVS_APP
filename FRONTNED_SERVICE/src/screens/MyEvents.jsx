import { Box, Typography } from "@mui/material";
import React from "react";

const MyEvents = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Typography>Hii, this is Events page</Typography>
    </Box>
  );
};

export default MyEvents;
