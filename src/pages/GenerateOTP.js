import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useGenerateOtp } from "../qraphql/actions/otpActions";
import { loadingVar } from "../qraphql/reactiveVars";

const GenerateOTP = () => {
  const [input, setInput] = useState();
  const [generateOtp] = useGenerateOtp({ mobile_number: input });

  const submit = () => {
    loadingVar(true);
    generateOtp();
  };

  return (
    <Stack p={4} pt={8} spacing={1}>
      <Typography variant="label">
        Ano ang iyong cellphone number na naka-register sa GrowSari?
      </Typography>
      <TextField
        placeholder="Mobile No."
        variant="standard"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ maxLength: 11 }} 
      />
      <Stack py={1}>
        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default GenerateOTP;
