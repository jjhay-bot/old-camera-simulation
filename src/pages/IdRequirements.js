import React, { useEffect } from "react";
import ModalBox from "../atoms/ModalBox";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import ButtonFooter from "../atoms/ButtonFooter";
import { Grid, Stack, Typography } from "@mui/material";
import ScreenContainer from "../templates/ScreenContainer";
import { getIdRequirements } from "../qraphql/actions/signupActions";
import { CameraIcon, CheckIcon, IdPictureBanner } from "../assets/icons";
import { allowCameraModalVar, idRequirementsVar } from "../qraphql/reactiveVars";

const IdRequirements = () => {
  const history = useHistory();
  const idRequirements = useReactiveVar(idRequirementsVar);

  const onClick = () => {
    allowCameraModalVar(true);
  };

  const onAccept = () => {
    allowCameraModalVar(false);
    history.push("/take-id-photo");
  };

  useEffect(() => {
    getIdRequirements();
  }, []);

  return (
    <ScreenContainer
      vh="100dvh"
      className="blue"
      footer={<ButtonFooter icon={<CameraIcon />} onClick={onClick} />}>
      <ModalBox onAccept={onAccept} />
      <Stack px={2} className="green">
        <Typography variant="title" py={1.25}>
          Picturan ang valid ID
        </Typography>

        <Stack py={1.25} alignItems="center">
          <IdPictureBanner />
        </Stack>
      </Stack>

      <Stack
        px={2}
        className="red"
        py={1.5}
        sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}>
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

export default IdRequirements;
