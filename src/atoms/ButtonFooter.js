import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";

const ButtonFooter = ({ icon, endIcon, onClick = {}, label = "Open camera" }) => (
  <Stack px={1} height="100px" p={1} sx={{ borderTop: "1px solid #EFF0F6", bgcolor: "#fff" }}>
    <Button variant="contained" fullWidth sx={{ p: 2 }} onClick={onClick}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>{icon}</Grid>
        <Grid item>
          <Typography variant="button">{label}</Typography>
        </Grid>
        <Grid item>{endIcon}</Grid>
      </Grid>
    </Button>
  </Stack>
);

export default ButtonFooter;
