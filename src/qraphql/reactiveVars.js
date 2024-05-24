import { makeVar } from "@apollo/client";

// UI
export const loadingVar = makeVar(false);
export const loadingLocalVar = makeVar(true);

export const notificationVar = makeVar(false);
export const notificationTypeVar = makeVar("error");
export const notificationMessageVar = makeVar("");

export const showDrawerVar = makeVar(true);

export const isDarkModeVar = makeVar(
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
);

export const mobileNumberVar = makeVar();
export const allowCameraModalVar = makeVar(false);

// QUESTIONS
export const acceptedIdsVar = makeVar([]);
export const idRequirementsVar = makeVar([]);
export const personalQuestionVar = makeVar();
export const personalUpgradeStatusVar = makeVar();
export const checkingStatusVar = makeVar(true);

export const isWebviewVar = makeVar(/webview/i.test(navigator.userAgent));
export const accessTokenVar = makeVar(sessionStorage.getItem("accessToken"));
