import React from "react";
import { CircularProgress, Box, Typography, Stack } from "@mui/material";
import { circularProgressClasses } from "@mui/material/CircularProgress";

const FacebookCircularProgress = (props) => {
  return (
    <Box>
      <CircularProgress
        variant="determinate"
        sx={{ color: "#fff" }}
        size={60}
        thickness={5}
        {...props}
        value={100}
        color="inherit"
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "silver",
          animationDuration: "600ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={60}
        thickness={5}
        {...props}
      />
    </Box>
  );
};

export const ProgressBar = ({ loading = true, message = "" }) => {
  return (
    loading && (
      <Stack
        position="fixed"
        top="45vh"
        sx={{ left: "50vw" }}
        mx={-2.5}
        zIndex={1}
        direction="column"
        justifyContent="center">
        <FacebookCircularProgress />
        <Stack sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="label">{message && "Loading..."}</Typography>
        </Stack>
      </Stack>
    )
  );
};

export default ProgressBar;
