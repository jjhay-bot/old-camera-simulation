import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { Grid, Stack, Typography } from "@mui/material";
import { acceptedIdsVar, accessTokenVar, notificationMessageVar, notificationTypeVar, notificationVar, personalUpgradeStatusVar, checkingStatusVar } from "../qraphql/reactiveVars";
import { KeyboardArrowRight } from "@mui/icons-material";
import ScreenContainer from "../templates/ScreenContainer";
import { cleanForage } from "../qraphql/actions/forage";
import { ProgressBar } from '../atoms/ProgressBar';
import {
  getQuestionId,
  setPersonalAnswer,
  getKycPersonalUpgradeStatus,
} from "../qraphql/actions/signupActions";

const AcceptedIds = () => {
  const history = useHistory();
  const acceptedIds = useReactiveVar(acceptedIdsVar);
  const accessToken = useReactiveVar(accessTokenVar);
  const personalUpgradeStatus = useReactiveVar(personalUpgradeStatusVar)
  const checkingStatus = useReactiveVar(checkingStatusVar)

  const onClick = async (answer) => {
    if (["SUBMITTED", "VERIFICATION IN PROGRESS", "VERIFIED"].includes(personalUpgradeStatus)) {
      await notificationTypeVar("error");
      notificationVar(true);
      notificationMessageVar(personalUpgradeStatus === "VERIFIED" ? "Submission already verified" : "ID Submitted! Verification in progress.");
    } else {
      const question_id = await getQuestionId(
        "Pumili sa listahan ang ipapasang VALID ID ng May-Ari ng Tindahan.\n(Dapat may signature at picture mo)"
      );
      setPersonalAnswer({ answer, question_id });
      history.push("/id-requirements");
    }
  };

  useEffect(() => {
    cleanForage();
    accessToken && getKycPersonalUpgradeStatus();
  }, []);

  if (checkingStatus) {
    return <ProgressBar loading={true} />;
  }

  return (
    <ScreenContainer footer={false} vh="100dvh" className="red">
      <Stack px={2} className="blue">
        <Typography variant="title">Submit your ID to pre-qualify for loans!</Typography>

        <Typography variant="description">
          Kailangan ang iyong ID para malaman kung pwede ka mag-qualify sa aming loans.
        </Typography>

        <Typography variant="label" py={2}>
          Anong ID ang nais mong i-submit?
        </Typography>
      </Stack>

      <Stack
        px={2}
        className="green"
        sx={{
          height: "100%",
          overflowY: "auto",
          maxWidth: "100%",
        }}>
        {acceptedIds.map(({ option, id }) => (
          <Grid
            key={id}
            py={1.5}
            container
            onClick={() => onClick(option)}
            justifyContent="space-between"
            alignItems="center"
            className="pointer">
            <Typography variant="body2">{option}</Typography>
            <Grid item>
              <KeyboardArrowRight color="primary" />
            </Grid>
          </Grid>
        ))}
      </Stack>
    </ScreenContainer>
  );
};

export default AcceptedIds;
