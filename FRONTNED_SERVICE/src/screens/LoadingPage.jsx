import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress size={80} sx={{ mb: 2 }} />
        <Typography variant="h5">Loading...</Typography>
      </Box>
    </Box>
  );
};

export default LoadingPage;
