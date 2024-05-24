import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { AuditorRoute, GuestRoute, GuestRoutePersonal, PersonalRoute, VerifierRoute } from "./lib/routes";
import { AuditorPanel } from "./views";
import NotFound from "./pages/NotFound/NotFound";
import AcceptedIds from "./pages/AcceptedIds";
import IdRequirements from "./pages/IdRequirements";
import TakeIdPhoto from "./pages/TakeIdPhoto";
import SelfieRequirements from "./pages/SelfieRequirements";
import TakeSelfie from "./pages/TakeSelfie";
import GenerateOTP from "./pages/GenerateOTP";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login/Login";
import VerifierPanelComponent from './views/VerifierPanel/verifier_panel';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          {/* Revamp - self signup */}
          <GuestRoutePersonal exact path="/generate-otp">
            <GenerateOTP />
          </GuestRoutePersonal>

          <GuestRoutePersonal exact path="/verify-otp">
            <VerifyOtp />
          </GuestRoutePersonal>

          <PersonalRoute exact path="/accepted-ids" name="Submit your ID" component={AcceptedIds} />
          <PersonalRoute
            exact
            path="/id-requirements"
            name="ID Requirements"
            component={IdRequirements}
          />
          <PersonalRoute exact path="/take-id-photo" name="Take Photo" component={TakeIdPhoto} />
          <PersonalRoute
            exact
            path="/selfie-requirements"
            name="Take a Selfie"
            component={SelfieRequirements}
          />
          <PersonalRoute exact path="/selfie-with-id" name="Selfie with ID" component={TakeSelfie} />
          
          <VerifierRoute exact path="/">
            <VerifierPanelComponent />
          </VerifierRoute>
          
          <VerifierRoute exact path="/verifier">
            <VerifierPanelComponent />
          </VerifierRoute>

          <AuditorRoute exact path="/auditor">
            <AuditorPanel/>
          </AuditorRoute>

          <Route in component={NotFound} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
