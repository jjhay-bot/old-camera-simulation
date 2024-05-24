import axios from "axios";
import constants from "../constants.json";
import { checkError } from "../qraphql/actions/uiActions";
import { getForage, setForage } from "../qraphql/actions/forage";
import { notificationMessageVar, notificationTypeVar, notificationVar } from "../qraphql/reactiveVars";

export const API_URI = constants.local_base_url;
export const OTP_URL = constants.OTP_URL;

export const sendFormData = async (url, formData) => {
  const token = await sessionStorage.getItem("accessToken");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      await notificationTypeVar("warning");
      return checkError(response.statusText);
    }
    await notificationTypeVar("success");
    notificationVar(true);
    notificationMessageVar(response?.data?.message || "Successfully sent photo");
  } catch (error) {
    await notificationTypeVar("error");
    checkError(error);
  }
};

export const requestAxios = async (url, payload) => {
  const token = await sessionStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const dev_mode = process.env.REACT_APP_STAGE === "local";
  const local_copy = url.replace(API_URI, "");

  let data;

  const fetchData = async () => {
    try {
      const method = payload ? "post" : "get";
      const response = await axios({ url, headers, payload, method });
      if (response.statusText !== "OK") {
        return checkError(response.statusText);
      }
      data = response.data;
      method === "get" && setForage(local_copy, response.data);
      return response.data;
    } catch (error) {
      checkError(error);
    }
  };

  if (dev_mode) {
    const stored_local_values = await getForage(local_copy);

    if (stored_local_values) {
      data = stored_local_values;
    } else {
      data = await fetchData();
    }
    return data;
  } else {
    const data = await fetchData();
    return data;
  }
};
