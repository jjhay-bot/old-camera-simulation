import React from "react";
import { Grid, Stack, Typography, IconButton } from "@mui/material";
import { BackIcon } from "../assets/icons";
import { useHistory } from "react-router-dom";

const DefaultHeader = ({ icon = <BackIcon />, title = "" }) => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <Grid container py={1} height="50px" alignItems="center">
      <Grid item sx={{ width: "fit-content" }} className="pointer">
        <IconButton size="small" onClick={goBack}>
          <BackIcon />
        </IconButton>
      </Grid>
      <Grid item px={1}>
        <Typography variant="header">{title}</Typography>
      </Grid>
    </Grid>
  );
};

const ScreenContainer = ({
  vh = "100dvh",
  children,
  header,
  footer,
  content,
  title,
  bgcolor,
  backAction,
  ...props
}) => {
  const supportsDvh = window.CSS && CSS.supports(`(height: ${vh})`);
  const maxHeightUnit = supportsDvh ? vh : "100vh";

  return (
    <Stack className="layout" height={maxHeightUnit} {...props} bgcolor={bgcolor}>
      <Stack flex={0}>
        {/* HEADERS */}
        {header ?? <DefaultHeader title={title}>{maxHeightUnit}</DefaultHeader>}
      </Stack>

      <Stack flex={1} sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }} className="silver">
        {/* CONTENTS */}
        {children ?? content}
      </Stack>

      <Stack flex={0}>
        {/* FOOTERS */}
        {footer}
      </Stack>
    </Stack>
  );
};

export default ScreenContainer;
