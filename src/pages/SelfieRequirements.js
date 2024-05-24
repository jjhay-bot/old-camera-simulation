import React, { useEffect } from "react";
import ModalBox from "../atoms/ModalBox";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import ButtonFooter from "../atoms/ButtonFooter";
import { Grid, Stack, Typography } from "@mui/material";
import ScreenContainer from "../templates/ScreenContainer";
import { CameraIcon, CheckIcon, SelfieBanner } from "../assets/icons";
import { getSelfieRequirements } from "../qraphql/actions/signupActions";
import { allowCameraModalVar, idRequirementsVar } from "../qraphql/reactiveVars";

const SelfieRequirements = () => {
  const history = useHistory();
  const idRequirements = useReactiveVar(idRequirementsVar);

  const onClick = () => {
    allowCameraModalVar(true);
  };

  const onAccept = () => {
    allowCameraModalVar(false);
    history.push("/selfie-with-id");
  };

  useEffect(() => {
    getSelfieRequirements();
  }, []);

  return (
    <ScreenContainer footer={<ButtonFooter icon={<CameraIcon />} onClick={onClick} />}>
      <ModalBox onAccept={onAccept} />

      <Stack px={2}>
        <Typography variant="title" py={1.25}>
          Magselfie hawak ang valid ID
        </Typography>

        <Stack flex={0} py={1.25} alignItems="center">
          <SelfieBanner />
        </Stack>
      </Stack>

      <Stack px={2} py={1.5} sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}>
        <Typography variant="label" color="#4E4B66" py={1.25}>
          Siguraduhing:
        </Typography>
        <Stack spacing={1.75}>
          {idRequirements.map((req, i) => (
            <Grid
              container
              key={i}
              alignItems="flex-start"
              justifyContent="space-between"
              className="pointer">
              <Grid item px={0.5}>
                <CheckIcon color="primary" sx={{ fontSize: "16px", px: "1px" }} />
              </Grid>
              <Grid item flex={1}>
                <Typography variant="body1">{req}</Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </ScreenContainer>
  );
};

export default SelfieRequirements;
