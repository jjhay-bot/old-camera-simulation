import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { createHttpLink } from "@apollo/client";
import { OTP_URL } from "../assets/helper";

const httpLink = createHttpLink({
  uri: OTP_URL,
});

// ADD HEADER_TOKEN
const authLink = setContext((_, { headers }) => {
  let token = sessionStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const cache = new InMemoryCache({});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
