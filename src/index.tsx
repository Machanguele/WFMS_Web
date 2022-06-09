import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin";
import Auth from "./layouts/Auth";
import {Provider} from "react-redux";
import {store} from "./store/store";
import PrivateRoute from "./PrivateRoutes";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route path="/auth" render={(props) => <Auth props={props} />} />
              <PrivateRoute path="/admin" render={(props) => <AdminLayout props={props} />} />
              <Redirect path="/" to="/auth/login"/>
          </Switch>
      </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
