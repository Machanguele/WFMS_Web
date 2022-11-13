import React, { useEffect, useState } from "react";
import {
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
import { loginAction } from "../store/actionCreators/login.actionCreator";
import { useTypeSelector } from "../hooks/useTypeSelector";
import SchemaIcon from "@mui/icons-material/Schema";
import logo from "../assets/img/logo.png";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";


const cardStyles = {
	detailsButton: {
		borderRadius: 5,
		marginLeft: '45%',
	},
	detailTitle:{
		fontSize: 13,
		fontWeight: 'bold',
		color: '#7F807F',
		marginRight: '3%',
		display: 'flex',
		justifyContent: 'flexStart'
	},
	detailValue:{
		fontSize: 13,
		color: '#6C716C',
		display: 'flex',
		justifyContent: 'flexStart'

	},
	cardStyle:{
		alignItems: 'left',
		marginLeft: 0,
		paddingLeft: 0,
		display: 'flex',
		alignContent: 'left',
		justifyContent: 'flexStart',
		backgroundColor: "rgba(255, 255, 200, .8)",
		borderLeftWidth: 8,
		// borderLeft: '5px solid #F39C12',
	},
	cardDetails:{
		display: 'flex',
		justifyContent: 'flexStart'
	},
	inputStyles:{
		/*
              backgroundColor: '#FEF9E7',
        */
		borderColor: '#167415',
		borderWidth: 1,
		fontSize: '12pt',
		fontFamily: 'sans-serif'
	},
	button:{
		color: '#FFFFFF',
		backgroundColor: '#167415',
		fontSize: '10pt',
		fontFamily: 'sans-serif',
		fontWeight: 'none',

	},
	recover:{
		color: '#45B39D',
		fontSize: '11pt',
		fontFamily: 'sans-serif',
		marginTop: '1.7%'
	}
}



const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginData, setLoginData] = useState<ILogin>();
	const { login, isLoading, errorMessage } = useTypeSelector(
		(state) => state.loginInfo
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const loginHandler = () => {
		dispatch(loginAction(email, password));
	};

	useEffect(() => {
		setLoginData(login);

        if(loginData?.token || localStorage.getItem('user')){
            history.push("/admin/dashboard")
        }
    },[login, history, loginData?.token])

	useEffect(() => {
		if (errorMessage) {
			alert("Error of Login" + errorMessage);
		}
	}, [errorMessage]);

	return (
		<Box sx={{marginTop: '10%', marginBottom: '20%'}}>
			<div className="content">
				<Row>
					<Col lg="6" md="6" sm="6" className="text-center  ml-auto mr-auto ">
						<Card className="h3 shadow border-0 ">
							<CardHeader>
								<Box sx={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
									<div className="logo">
										<a
											href="http://www.engenharia.uem.mz/"
											className="simple-text logo-normal"
											target="_blank" rel="noreferrer"
										>
											<img src={logo} color={'white'} width={'50%'} className={"logoName"}/>
										</a>
									</div>
								</Box>{/*
								<div className="text-center  text-success mb-3 mt-5">
									<small> Iniciar a sessão</small>
								</div>*/}
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
									<FormGroup>
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-lock-circle-open" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Senha"
												type="password"
												autoComplete="new-password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</InputGroup>
									</FormGroup>
									<div>
										<Box>
											<Button
												color="success"
												onClick={()=>loginHandler()}
												style={cardStyles.button}
											>
												Iniciar a sessão
											</Button>
										</Box>
										<a className="text-success" href="/auth/recover">
											<small style={cardStyles.recover}>Não consegue iniciar a sessão?</small>
										</a>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
			{isLoading && <Spinner type="border" />}
		</Box>
	);
};

export default Login;
