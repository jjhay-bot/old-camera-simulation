import React from "react";
import { useReactiveVar } from "@apollo/client";
import { CameraAccessBanner } from "../assets/icons";
import { allowCameraModalVar } from "../qraphql/reactiveVars";
import { Dialog, Typography, Stack, Button } from "@mui/material";

const ModalBox = ({ onAccept }) => {
  const showModal = useReactiveVar(allowCameraModalVar);

  const handleClose = () => {
    allowCameraModalVar(false);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={showModal}
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: "12px" } }}>
        <Stack p={4} alignItems="center" sx={{ maxWidth: "320px", textAlign: "center" }} spacing={1}>
          <CameraAccessBanner />
          <Typography variant="modal_title">Allow Saripay to access your camera</Typography>
          <Typography variant="modal_description" pb={2}>
            Para makapagkuha at mag-submit ng picture, i-on ang camera access.
          </Typography>
          <Button
            fullWidth
            onClick={onAccept}
            variant="contained"
            sx={{ fontSize: "13px", borderRadius: "8px", p: 1.25 }}>
            Allow camera access
          </Button>
          <Button
            fullWidth
            size="small"
            variant="text"
            onClick={handleClose}
            sx={{ fontSize: "13px", borderRadius: "8px", p: 1.25 }}>
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default ModalBox;
