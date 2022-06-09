import React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = ({ ...rest }) => {
    if(!localStorage.getItem('user'))  return <Redirect to="/"/>;
    return <Route {...rest}/>;
}

export default PrivateRoute;
