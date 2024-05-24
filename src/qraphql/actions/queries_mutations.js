import { gql } from "@apollo/client";

export const VERIFY_OTP = gql`
  mutation Verify_otp_v3($otp: String!, $mobileNumber: String!, $requestType: String!) {
    verify_otp_v3(otp: $otp, mobile_number: $mobileNumber, request_type: $requestType) {
      access_token
      message
    }
  }
`;

export const GENERATE_OTP = gql`
  mutation Generate_otp_v3($mobileNumber: String!, $requestType: String!) {
    generate_otp_v3(mobile_number: $mobileNumber, request_type: $requestType) {
      uuid
    }
  }
`;

