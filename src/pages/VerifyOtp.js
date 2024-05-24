import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { mobileNumberVar, loadingVar } from "../qraphql/reactiveVars";
import { useVerifyOtp } from "../qraphql/actions/otpActions";

const VerifyOtp = () => {
  const history = useHistory();
  const [input, setInput] = useState();
  const mobileNumber = useReactiveVar(mobileNumberVar);

  const [verifyOtp] = useVerifyOtp({ otp: input, mobile_number: mobileNumber });

  const submit = () => {
    loadingVar(true);
    verifyOtp();
  };

  useEffect(() => {
    if (!mobileNumber) {
      return history.push("/generate-otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack p={4} pt={8} spacing={1}>
      <Typography variant="label">Verify OTP:</Typography>
      <TextField
        placeholder="OTP code"
        variant="standard"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Stack py={1}>
        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default VerifyOtp;
