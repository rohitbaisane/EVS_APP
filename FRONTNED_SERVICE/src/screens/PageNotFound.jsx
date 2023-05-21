import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" textAlign="center">
          PAGE NOT FOUND
        </Typography>
      </Box>
    </Box>
  );
};
export default PageNotFound;
