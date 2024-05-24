import {
  accessTokenVar,
  loadingLocalVar,
  loadingVar,
  notificationMessageVar,
  notificationTypeVar,
  notificationVar,
} from "../reactiveVars";
import { jwtDecode } from "jwt-decode";

export const checkError = (error) => {
  console.log(`%c ${error?.message || error || "Server Error"} `, "background:  #66ff66");
  loadingVar(false);
  notificationVar(true);
  notificationMessageVar(error?.message || error || "Server Error");
};

export const validateJwt = (tokenparams, path = "") => {
  const sanitizedToken = tokenparams?.replace(/[&<>"']/g, function (match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[match];
  });
  try {
    const { exp } = jwtDecode(sanitizedToken);
    if (sanitizedToken) {
      if (exp < Date.now() / 1000) {
        notificationTypeVar("error");
        notificationMessageVar("Session expired.");
        notificationVar(true);
        setTimeout(() => {
          sessionStorage.removeItem("accessToken");
        }, 2000);
        return true;
      }
      if (path.match(/accepted-ids/i)) {
        sessionStorage.setItem("accessToken", sanitizedToken);
        accessTokenVar(sanitizedToken)
      }
      loadingLocalVar(false);
      return true;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    loadingLocalVar(false);
    return false;
  }
};
