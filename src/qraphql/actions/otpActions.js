import { loadingVar, mobileNumberVar } from "../reactiveVars";
import { checkError } from "./uiActions";
import { useMutation } from "@apollo/client";
import { GENERATE_OTP, VERIFY_OTP } from "./queries_mutations";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const useVerifyOtp = ({ otp, mobile_number, type = "KYC_LOGIN" }) => {
  return useMutation(VERIFY_OTP, {
    variables: {
      "otp": otp,
      "mobileNumber": `${mobile_number}`,
      "requestType": type,
    },
    onCompleted: async (data) => {
      sessionStorage.setItem("accessToken", data.verify_otp_v3.access_token);
      loadingVar(false);
      window.location.reload();
    },
    onError: (e) => checkError(e),
  });
};

export const useGenerateOtp = ({ mobile_number, type = "KYC_LOGIN" }) => {
  const history = useHistory();
  return useMutation(GENERATE_OTP, {
    variables: {
      "mobileNumber": `${mobile_number}`,
      "requestType": type,
    },
    onCompleted: (data) => {
      mobileNumberVar(mobile_number);
      loadingVar(false);
      history.push("/verify-otp");
    },
    onError: (e) => checkError(e),
  });
};
