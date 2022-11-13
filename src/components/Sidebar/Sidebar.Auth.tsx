import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import { ExtractRouteParams, RouteComponentProps } from "react-router";
import { IRoute } from "../../Interfaces/IRoutes";

var ps: any;

interface ISideBarProps {
	props: RouteComponentProps<ExtractRouteParams<string, string>>;
	routes: Array<IRoute>;
}

function Sidebar({ props, routes }: ISideBarProps) {
	const sidebar = React.useRef<PerfectScrollbar & HTMLDivElement>(null);
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	};
	React.useEffect(() => {
		if (navigator.platform.indexOf("Win") > -1 && sidebar.current) {
			ps = new PerfectScrollbar(sidebar.current, {
				suppressScrollX: true,
				suppressScrollY: false,
			});
		}
		return function cleanup() {
			if (navigator.platform.indexOf("Win") > -1) {
				ps.destroy();
			}
		};
	});
	return (
		<div
			className="sidebar "
			data-color="success"
			data-active-color="success"
			style={{ backgroundColor: "#167415" }}
		>
			<div className="logo" style={{ backgroundColor: "#167415" }}>
				<a
					href="http://www.engenharia.uem.mz/"
					className="simple-text  ml-5"
					target="_blank"
					rel="noreferrer"
				>
					ECO-FEUEM
				</a>
			</div>
			<div
				className="sidebar-wrapper"
				ref={sidebar}
				style={{ backgroundColor: "#167415" }}
			>
				<Nav style={{ height: "100%"}}>
					{routes.map((prop, key) => {
						if (prop.layout === "/auth" && !prop.invisible) {
							return (
								<li className={activeRoute(prop.path)} key={key}>
									<NavLink
										to={prop.layout + prop.path}
										className="nav-link"
										activeClassName="active"
									>
										<i className={prop.icon} />
										<p>{prop.name}</p>
									</NavLink>
								</li>
							);
						} else {
							return null;
						}
					})}
				</Nav>
				<a
					href="http://www.engenharia.uem.mz/"
					className="simple-text text-light text-center logo-normal ml-5 h3 n"
					target="_blank"
					rel="noreferrer"
				>
					<i className="fa fa-question-circle " aria-hidden="true"></i>
				</a>
			</div>
		</div>
	);
}

export default Sidebar;
