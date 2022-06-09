/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";

function Footer() {
  return (
		<footer className="footer">
			<Container fluid>
				<Row className="text-success">
					<nav className="footer-nav">
						<ul>
							<li>
								<a href="http://www.engenharia.uem.mz/" target="_blank">
                  ECO-FEUEM
                </a>
							</li>
						</ul>
					</nav>
					<div className="credits ml-auto">
						<div className="copyright">
							&copy; { new Date().getFullYear()}, feito com{" "}
							<i className="fa fa-heart heart" /> by FEUEM
						</div>
					</div>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
