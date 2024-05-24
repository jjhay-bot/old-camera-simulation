import {
  acceptedIdsVar,
  idRequirementsVar,
  loadingVar,
  notificationMessageVar,
  notificationTypeVar,
  notificationVar,
  personalQuestionVar,
  personalUpgradeStatusVar,
  checkingStatusVar,
} from "../reactiveVars";
import { find, findIndex, sortBy } from "lodash";
import { checkError } from "./uiActions";
import { API_URI, requestAxios } from "../../assets/helper";
import { setForage } from "./forage";

export const getPersonalQuestions = async (history, type = "personal") => {
  try {
    const data = await requestAxios(`${API_URI}/user/v2/kyc_questions?kyc_type=${type}`);
    const rejectedItems = data.filter((x) => x.status === "REJECTED");
    const reuploadPhotoID = rejectedItems.find((x) =>
      x.question.match(/I-upload ang napiling VALID ID/i)
    );
    const reuploadSelfie = rejectedItems.find((x) =>
      x.question.match(/I-upload ang napiling ID or selfie/i)
    );

    personalQuestionVar(data);

    if (reuploadPhotoID) {
      history.push("/id-requirements");
    } else if (reuploadSelfie) {
      history.push("/selfie-requirements");
    };

    rejectedItems && checkingStatusVar(false);
  } catch (e) {
    console.log("error", e);
    checkingStatusVar(false);
    notificationVar(true);
    checkError(e);
  }
};

export const getAcceptedIds = async () => {
  loadingVar(true);
  try {
    const data = await requestAxios(`${API_URI}/user/v2/list_docs`);
    const reorder = sortBy(data, (d) => d.option === "Other");
    acceptedIdsVar(reorder);
    loadingVar(false);
  } catch (e) {
    loadingVar(false);
    console.log("error", e);
    notificationVar(true);
    checkError(e);
  }
};

export const getIdRequirements = async () => {
  try {
    const data = [
      "Malinaw ang picture",
      "Hindi pa expired ang ID",
      "Pareho ang pangalan sa ID at ang pangalan sa account",
    ];
    const reorder = sortBy(data, (d) => d.id === "Other");
    idRequirementsVar(reorder);
  } catch (e) {
    checkError(e);
  }
};

export const getSelfieRequirements = async () => {
  try {
    const data = [
      "Malinaw ang picture",
      "Hawak ang ID na ginamit sa previous step sa tabi ng mukha",
      "Kita ang buong mukha at buong ID sa picture",
    ];
    const reorder = sortBy(data, (d) => d.id === "Other");
    idRequirementsVar(reorder);
  } catch (e) {
    checkError(e);
  }
};

export const setPersonalAnswer = async ({ answer, question_id }) => {
  let personalQuestion = personalQuestionVar();
  const index = findIndex(personalQuestionVar(), { question_id: question_id });

  if (index !== -1) {
    const updatedQuestions = [...personalQuestion];

    updatedQuestions[index] = {
      ...updatedQuestions[index],
      answer: answer,
    };

    personalQuestionVar(updatedQuestions);
    setForage("save_answers", updatedQuestions);
  }
};

export const getKycPersonalUpgradeStatus = async () => {
  loadingVar(true);

  const getStatus = {
    "IN PROGRESS": "initial status",
    "SUBMITTED": "Verification in progress",
    "VERIFICATION IN PROGRESS": "Verification in progress",
    "VERIFIED": "All submissions verified",
    "PARTIALLY VERIFIED": "Submissions rejected. Please resubmit the required details",
    "REJECTED": "Submissions rejected. Please resubmit the required details",
  };

  try {
    const response = await requestAxios(`${API_URI}/user/v2/account_kyc_status?kyc_type=personal`);
    personalUpgradeStatusVar(response?.status);
    if (response?.status !== "IN PROGRESS") {
      await notificationTypeVar("info");
      notificationVar(true);
      notificationMessageVar(getStatus[response?.status]);
    }
    loadingVar(false);
  } catch (e) {
    loadingVar(false);
    console.log("error", e);
    checkError(e);
  }
};

export const getQuestionId = async (question) => {
  const personalQuestion = personalQuestionVar();
  const questionId = find(personalQuestion, (q) => q.question === question)?.question_id;
  if (!questionId) {
    await notificationTypeVar("info");
    notificationVar(true);
    notificationMessageVar("Cant find question on list");
  }
  return questionId;
};
