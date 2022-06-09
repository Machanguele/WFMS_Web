
import React from "react";
// javascript plugin used to create scrollbars on windows
import { Route, Switch} from "react-router-dom";
import {ExtractRouteParams, RouteComponentProps} from "react-router";
import routes from "../routes";
import Sidebar from "../components/Sidebar/Sidebar.Auth";

interface IAuthProps {
  props: RouteComponentProps<ExtractRouteParams<string,string>>
}

function Auth({props} : IAuthProps) {

  return (
		<div className="wrapper" >
			<Sidebar props={props} routes={routes}/>
			<div className="main-panel">
				<Switch>
					{routes.map((prop, key) => {
						if (prop.layout === "/auth") {
							return (
								<Route
									path={prop.layout + prop.path}
									component={prop.component}
									key={key}
								/>
							);
						} else {
							return null;
						}
					})}
				</Switch>
			</div>
		</div>
	);
}

export default Auth;
