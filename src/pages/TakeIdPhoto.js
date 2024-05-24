import { Stack } from "@mui/material";
import React from "react";
import ScreenContainer from "../templates/ScreenContainer";
import CameraArea from "../atoms/CameraArea";

const TakeIdPhoto = () => {
  return (
    <ScreenContainer title="Photo of ID">
      <Stack sx={{ height: "100%" }}>
        <CameraArea question="I-upload ang napiling VALID ID" />
      </Stack>
    </ScreenContainer>
  );
};

export default TakeIdPhoto;
