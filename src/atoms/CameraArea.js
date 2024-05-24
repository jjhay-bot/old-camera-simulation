import { Camera } from "react-camera-pro";
import { useHistory } from "react-router-dom";
import React, { useState, useRef } from "react";
import { API_URI, sendFormData } from "../assets/helper";
import { getForage, setForage } from "../qraphql/actions/forage";
import { CaptureIcon, CheckedIcon, RetakeIcon } from "../assets/icons";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { getQuestionId } from "../qraphql/actions/signupActions";
import { useReactiveVar } from "@apollo/client";
import { loadingVar, notificationMessageVar, notificationVar, personalQuestionVar } from "../qraphql/reactiveVars";
import imageCompression from 'browser-image-compression';

const CameraArea = ({
  title,
  question = "",
  redirect = "/selfie-requirements",
  frameHeight = "240px",
  bottomOffset = "5rem",
  captionWidth = "165px",
  captionPosition = "-210px",
  facingMode = "environment",
  description = "Make sure your ID is within the box",
}) => {
  const camera = useRef(null);
  const [image, setImage] = useState();
  const history = useHistory();
  const personalQuestion = useReactiveVar(personalQuestionVar);
  const loading = useReactiveVar(loadingVar);

  const takePhoto = async () => {
    if (!camera.current) return;
    try {
      const photo = await camera.current.takePhoto();
      const blob = await compressImage(photo)
      setImage(blob);
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const compressImage = async (photoDataUrl) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };

      // Convert base64 data URL to Blob
      const blob = await fetch(photoDataUrl).then((res) => res.blob());

      // Compress the image Blob
      const compressedBlob = await imageCompression(blob, options);

      // Convert the compressed Blob to base64 data URL
      const reader = new FileReader();
      const base64ImagePromise = new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
      });
      reader.readAsDataURL(compressedBlob);

      const base64Image = await base64ImagePromise;

      return base64Image;
    } catch (error) {
      console.error('Error compressing image:', error);
      return null;
    }
  };

  const retakePhoto = () => {
    setImage();
  };

  const usePhoto = async () => {
    try {
      const blob = await fetch(image).then((res) => res.blob());
      const question_id = await getQuestionId(question);
      const existingFileData = (await getForage("file_data")) || {};
      await setForage("file_data", { ...existingFileData, [`file_data${question_id}`]: blob });

      if (question === "I-upload ang napiling ID or selfie") {
        loadingVar(true)
        let formData = new FormData();

        const file_data = await getForage("file_data");
        const save_answers = await getForage("save_answers");

        formData.append(`data`, JSON.stringify(save_answers || personalQuestion));
        Object.entries(file_data).map(([key, val]) => formData.append(key, val));

        await sendFormData(`${API_URI}/user/v2/submit_answers?kyc_type=personal`, formData);
        loadingVar(false)
        return;
      }
      history.push(redirect);

    } catch (error) {
      console.error("An error occurred while sending the photo:", error);
      notificationVar(true);
      notificationMessageVar(`An error occurred while saving the photo: ${JSON.stringify(error)}`);
    }
  };

  return (
    <>
      <Stack sx={{ width: "100%", height: "100%", position: "relative", overflowY: "hidden" }}>
        {image ? (
          <Stack
            flex={1}
            sx={{
              height: "100%",
              position: "relative",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${image})`,
            }}
          />
        ) : (
          <>
            <Camera
              ref={camera}
              aspectRatio="cover"
              facingMode={facingMode}
            // onCameraStart={handleCameraAccess}
            />
            <Stack
              alignItems="center"
              sx={{
                width: "100%",
                position: "absolute",
                bgcolor: "transparent",
                bottom: "2rem",
                zIndex: 2,
              }}>
              <IconButton onClick={takePhoto}>
                <CaptureIcon />
              </IconButton>
            </Stack>
          </>
        )}

        {/* // Masked */}
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            opacity: image && 0.9,
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 1,
          }}>
          <Stack
            flex={1}
            alignItems="center"
            justifyContent="flex-end"
            className="mask"
            sx={{ opacity: image && 0.9, width: "100%" }}
          />

          <Stack
            spacing={0.5}
            sx={{
              maxWidth: captionWidth,
              position: "absolute",
              textAlign: "center",
              opacity: 1,
              transform: `translateY(${captionPosition})`,
            }}>
            <Typography variant="label" sx={{ opacity: 1, color: "#fff" }}>
              {title}
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 1 }}>
              {description}
            </Typography>
          </Stack>

          <Grid container justifyContent="center">
            <Grid item className="mask" sx={{ opacity: image && 0.9 }} flex={1} />
            <Grid
              item
              sx={{
                zIndex: 2,
                width: "90%",
                maxWidth: "400px",
                borderRadius: "8px",
                height: frameHeight,
                boxSizing: "border-box",
                outline: "4px solid #5CEAD9",
                filter: "brightness(1.15)",
              }}
            />
            <Grid item className="mask" sx={{ opacity: image && 0.9 }} flex={1} />
          </Grid>

          <Stack
            className="mask"
            sx={{ opacity: image && 0.9, width: "100%" }}
            flex={1}
            pb={bottomOffset}
          />
        </Stack>
      </Stack>

      {image && (
        <Grid
          pt={0.5}
          px={2}
          container
          spacing={1}
          justifyContent="center"
          sx={{
            bottom: 0,
            zIndex: 2,
            position: "absolute",
            height: "90px",
            bgcolor: "#fff",
          }}>
          <Grid item xs={6} p={1}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={retakePhoto}
              sx={{ borderRadius: "8px", p: 1, fontWeight: 600 }}
              startIcon={<RetakeIcon />}>
              Retake photo
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="small"
              onClick={usePhoto}
              variant="contained"
              sx={{ borderRadius: "8px", p: 1, fontWeight: 600 }}
              startIcon={<CheckedIcon />}>
              Use photo
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CameraArea;
