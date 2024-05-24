import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import SendNotification from "../atoms/SendNotification";
import ProgressBar from "../atoms/ProgressBar";
import { useReactiveVar } from "@apollo/client";
import { loadingVar, loadingLocalVar, accessTokenVar } from "../qraphql/reactiveVars";
import { validateJwt } from "../qraphql/actions/uiActions";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getPersonalQuestions, getAcceptedIds } from "../qraphql/actions/signupActions";

var isLoggedin = !!localStorage.getItem("userType");

const userType = localStorage.getItem("userType");

function AuditorRoute({ component: RouteComponent, ...rest }) {
  const userType = localStorage.getItem("userType")
  const history = useHistory()

  useEffect(() => {
    if (userType !== 'AUDITOR') {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Route
      {...rest}
      render={(props) => {
        return <RouteComponent {...props} />;
      }}
    />
  );
}

function PersonalRoute({ component: RouteComponent, ...rest }) {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const tokenparams = searchParams.get("token");

  const loading = useReactiveVar(loadingVar);

  const tokenFromInjection = window.mobileAppJWT;
  const loadingLocal = useReactiveVar(loadingLocalVar);
  const accessToken = useReactiveVar(accessTokenVar);

  useEffect(() => {
    const validToken = validateJwt(accessToken ?? tokenFromInjection ?? tokenparams, pathname);
    if (!validToken) {
      history.push("/generate-otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadingLocal && accessToken) {
      getPersonalQuestions(history);
      getAcceptedIds();
    }
  }, [loadingLocal]);

  return (
    <>
      <ProgressBar loading={loading} />
      <SendNotification />
      <Route {...rest} render={(props) => <RouteComponent {...props} />} />
    </>
  );
}

function VerifierRoute({ component: RouteComponent, ...rest }) {
  const userType = localStorage.getItem("userType")
  const history = useHistory()

  useEffect(() => {
    if (userType !== 'VERIFIER') {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return <RouteComponent {...props} />;
        }}
      />
    </>
  );
}

function GuestRoute({ component: RouteComponent, ...rest }) {
  const loading = useReactiveVar(loadingVar);
  const userType = localStorage.getItem("userType")
  const history = useHistory()

  useEffect(() => {
    if (userType === 'VERIFIER') {
      history.push('/verifier')
    }
    if (userType === 'AUDITOR') {
      history.push('/auditor')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <ProgressBar loading={loading} />
      <SendNotification />
      <Route
        {...rest}
        render={(props) => {
            return <RouteComponent {...props} />;
        }}
      />
    </>
  );
}

function GuestRoutePersonal({ component: RouteComponent, ...rest }) {
  const history = useHistory();
  const loading = useReactiveVar(loadingVar);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const validToken = validateJwt(accessToken);
    if (validToken) {
      history.push("/accepted-ids");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <ProgressBar loading={loading} />
      <SendNotification />
      <Route
        {...rest}
        render={(props) => {
          if (isLoggedin && userType == "AUDITOR") {
            return (
              <Redirect
                to={{
                  pathname: "/auditor",
                  state: { from: props.location },
                }}
              />
            );
          } else if (isLoggedin && userType == 'VERIFIER') {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            return <RouteComponent {...props} />;
          }
        }}
      />
    </>
  );
}

export { PersonalRoute, GuestRoutePersonal, GuestRoute, AuditorRoute, VerifierRoute };
