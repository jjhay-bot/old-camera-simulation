import { Stack } from "@mui/material";
import React from "react";
import ScreenContainer from "../templates/ScreenContainer";
import CameraArea from "../atoms/CameraArea";

const TakeSelfie = () => {
  return (
    <ScreenContainer title="Selfie with ID" vh="100dvh" className="blue">
      <Stack sx={{ height: "100%" }}>
        <CameraArea
          facingMode="user"
          frameHeight="304px"
          captionWidth="300px"
          captionPosition="-225px"
          bottomOffset="1rem"
          redirect="/account-upgrade"
          title="Hawakan ang ID sa tabi ng mukha"
          question="I-upload ang napiling ID or selfie"
          description="Siguraduhing kita ang buong mukha at buong ID sa picture"
        />
      </Stack>
    </ScreenContainer>
  );
};

export default TakeSelfie;
