import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { CloseIcon } from "../assets/icons";
import { notificationMessageVar, notificationTypeVar, notificationVar } from "../qraphql/reactiveVars";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SendNotification = () => {
  const history = useHistory();
  const notification = useReactiveVar(notificationVar);
  const notificationMessage = useReactiveVar(notificationMessageVar);
  const notificationType = useReactiveVar(notificationTypeVar);
  const handleClose = () => {
    notificationVar(false);
    if (notificationMessage.match(/Session expired/i)) {
      history.push("/generate-otp");
      sessionStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        notificationVar(false);
      }, 6000);
    }
  }, [notification]);

  const getColor = () =>
    ({
      success: "#007358",
      warning: "#ef7b2a",
      error: "#d32f2f",
      info: "#0288d1",
    }[notificationType] || "#d32f2f");

  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={notification}>
      <Alert
        severity={notificationType || "error"}
        action={<CloseIcon fill={getColor()} onClick={handleClose} />}>
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};

export default SendNotification;
