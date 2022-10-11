
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import DemoNavbar from "../components/Navbars/DemoNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import {ExtractRouteParams, RouteComponentProps} from "react-router";
import routes from "../routes";

var ps: PerfectScrollbar;

interface IDashboardProps {
  props: RouteComponentProps<ExtractRouteParams<string,string>>,
}

function Dashboard({props} : IDashboardProps) {
  const mainPanel = React.useRef<PerfectScrollbar & HTMLDivElement>(null);
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1 && mainPanel.current) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (mainPanel.current){
      mainPanel.current.scrollTop = 0;
    }
    if(document.scrollingElement){
      document.scrollingElement.scrollTop = 0;
    }
  }, [location]);

  return (
    <div className="wrapper" >
      <Sidebar
        props={props}
        routes={routes}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar props={props} />
        <Switch>
          {routes.map((prop, key) => {
            if(prop.layout === "/admin"){
              return (
                  <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                  />
              );
            }else {
              return null
            }
          })}
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
