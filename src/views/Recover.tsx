import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
	Spinner,
	CardHeader,
} from "reactstrap";
import { ILogin } from "../models/login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { recoverAction } from "../store/actionCreators/login.actionCreator";
import { useTypeSelector } from "../hooks/useTypeSelector";

const Login = () => {
	const [email, setEmail] = useState("");
	const [loginData, setLoginData] = useState<ILogin>();
	const { login, isLoading, errorMessage } = useTypeSelector(
		(state) => state.login
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const loginHandler = () => {
		dispatch(recoverAction(email));
	};

	useEffect(() => {
		setLoginData(login);

		if (loginData?.token) {
			history.push("/admin/dashboard");
		}
	}, [login, history, loginData?.token]);

	useEffect(() => {
		if (errorMessage) {
			alert("Error of Login" + errorMessage);
		}
	}, [errorMessage]);

	return (
		<>
			<div className="content">
				<Row>
					<Col
						lg="6"
						md="6"
						sm="6"
						className="text-center  ml-auto mr-auto "
					>
						<Card className="h3 shadow border-0 ">
							<CardHeader>
								<div className="text-center  text-success mb-3 mt-5">
									<small> Recuperar a senha </small>
								</div>
							</CardHeader>
							<CardBody className="px-lg-5 py-lg-5">
								<Form role="form">
									<FormGroup className="mb-3">
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-email-83" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Email"
												type="email"
												autoComplete="new-email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</InputGroup>
									</FormGroup>
									
									<div>
										<Button
											block
											className="my-2  mb-3 mt-5"
											size="lg"
											color="success"
											type="button"
											onClick={loginHandler}
										>
											Send
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
			{isLoading && <Spinner type="border" />}
		</>
	);
};

export default Login;
