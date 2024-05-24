import React, { useEffect, useState } from "react";
import ScreenContainer from "../templates/ScreenContainer";
import { Alert, Grid, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { CheckIcon, CloseIcon, NextIcon, RefreshIcon } from "../assets/icons";
import progressImg from "../assets/progress.png";
import ButtonFooter from "../atoms/ButtonFooter";
import { getKycPersonalUpgradeStatus } from "../qraphql/actions/signupActions";
import { useReactiveVar } from "@apollo/client";
import { loadingVar, personalUpgradeStatusVar } from "../qraphql/reactiveVars";
import { lowerCase } from "lodash";
import { cleanForage } from "../qraphql/actions/forage";
import { useHistory } from "react-router-dom";

const UpgradeAccount = () => {
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();

  const loading = useReactiveVar(loadingVar);
  const personalUpgradeStatus = useReactiveVar(personalUpgradeStatusVar);

  const onSubmit = () => {
    alert("Continue...");
    cleanForage();
    history.push("/accepted-ids");
  };

  useEffect(() => {
    getKycPersonalUpgradeStatus();
  }, []);

  useEffect(() => {
    if (!loading) {
      setShowAlert(true);
      setProgress((personalUpgradeStatus?.status.match(/completed/gi)?.length / 1) * 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <ScreenContainer
      vh="100dvh"
      bgcolor="#eff0f7"
      footer={<ButtonFooter label="Continue" endIcon={<NextIcon />} onClick={onSubmit} />}>
      <Stack px={2}>
        <Typography variant="title" py={1.25}>
          Upgrade your account
        </Typography>

        <Typography variant="description">
          Dagdagan na ang benefits ng negosyo mo! Optional itong lahat.
        </Typography>

        <Stack py={2.5} px={2}>
          <Paper
            elevation={3}
            sx={{ borderRadius: "8px", zIndex: 2, boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <Stack p={1.25} sx={{ bgcolor: "#fff", borderRadius: "8px" }} spacing={0.75}>
              <Typography variant="progress">
                <span>0 OF 1</span>
                <span style={{ padding: "6px", fontWeight: 400 }}>COMPLETED</span>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  borderRadius: "6px",
                  height: "12px",
                  backgroundSize: "80px",
                  backgroundImage: `url(${progressImg})`,
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </Stack>

      <Stack
        px={2}
        justifyContent="space-between"
        sx={{
          height: "100%",
          overflowY: "auto",
          maxWidth: "100%",
          bgcolor: "#fff",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          mt: -6,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}>
        <Stack>
          <Typography variant="label" pt={6.5} pb={3}>
            Para magka-access sa loans:
          </Typography>

          <Grid
            container
            spacing={0.5}
            alignItems="center"
            sx={{ border: "1px solid #EFF0F6", p: 1, py: 1, borderRadius: "4px" }}>
            <Grid item>
              <IconButton sx={{ bgcolor: "#EFF0F6", p: 1.75 }}>
                <RefreshIcon />
              </IconButton>
            </Grid>
            <Grid item flex={1}>
              <Stack spacing={0.25} px={1}>
                <Typography variant="body2">Submit your ID</Typography>
                <Typography variant="description" pb={1}>
                  Nirereview na ito at makakakuha ka ng notification pag okay na
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>

        <Grid container width="100%" alignItems="center" py={2}>
          {showAlert && (
            <Alert
              sx={{ backgroundColor: "#DFF2EE", width: "100%", borderRadius: "8px" }}
              onClose={() => {
                setShowAlert(false);
              }}
              action={<CloseIcon fill="#007358" onClick={() => setShowAlert(false)} />}
              icon={<CheckIcon fontSize="inherit" fill="#007358" />}>
              <Typography color="#007358" variant="subtitle1">
                {`ID ${lowerCase(personalUpgradeStatus?.status)}`}
              </Typography>
            </Alert>
          )}
        </Grid>
      </Stack>
    </ScreenContainer>
  );
};

export default UpgradeAccount;
