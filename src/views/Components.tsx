/*!

=========================================================
* Paper Component React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col, Button,
} from "reactstrap";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {
    addComponentAction,
    componentAction, ganttomponentsAction,
    setSelectedComponentAction
} from "../store/actionCreators/component.actionCreator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Box from "@mui/material/Box";
import {
    FormGroup,
    Label,
    Input,
    FormText
} from "reactstrap";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import IconButton from "@mui/material/IconButton";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel} from "@mui/lab";
import {IComponent} from "../models/component";
import SettingsIcon from '@mui/icons-material/Settings';
// core components


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
    inputLabels:{
        color: '#167415',
        fontSize: '12pt',
        fontFamily: 'sans-serif'
    },
    infoLabels:{
        color: '#F39C12',
        fontSize: '11pt',
        fontFamily: 'sans-serif',
        marginTop: '1.7%'
    }
}

function Component() {

    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [departmentId, setDepartmentId] = useState(3);
    const [description, setDescription] = useState("");
    const [expectedStartDate, setExpectedStartDate] = useState("2022-10-10");
    const [expectedEndDate, setExpectedEndDate] = useState("2022-10-12");
    const [addComponent, setAddComponent] = useState(false);


    const {components, isLoading, errorMessage, componentId, gantComponents } = useTypeSelector(
        (state) => state.component
    );
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const componentHandler = () => {
        dispatch(componentAction());
    };

    const handleCreateComponent = ()=>{

        dispatch(addComponentAction(title, departmentId, description, expectedStartDate, expectedEndDate))
        setTimeout(()=>{
            setAddComponent(false)
            componentHandler()
        }, 1000)
    }

    useEffect(()=>{
        componentHandler()
    }, [])


    const onClickDetails = (component: number)=>{
        dispatch(setSelectedComponentAction(component))
        history.push(`/admin/actividades/${component}`)

    }

    const ComponentBoard =()=>{
        let auxiliarList: IComponent[];
        if(value==="one")
            auxiliarList = components.filter(x=>x.activities.length == 0 && x.finished == false)
        else if(value==="two")
            auxiliarList = components.filter(x=>x.finished == false && x.activities.length != 0)
        else
            auxiliarList =components.filter(x=>x.finished)

        return(
            <Row>
                {auxiliarList?.map((item, id) => {
                    return <Col lg="3" md="6" sm="6" key={id}>
                        <Card className="card-stats"
                              style={{borderLeft: value=="one"?'5px solid #F39C12':
                                      value=="two"? '5px solid #5DADE2': '5px solid #27AE60',
                                  ...cardStyles.cardStyle}}>
                            <CardBody>
                                <Row>
                                    <Col md="11" xs="7">
                                        <div className="numbers">
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Componente:</span>
                                                <span style={cardStyles.detailValue}>{item.title}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Criado em:</span>
                                                <span style={cardStyles.detailValue}>{item.createdAt}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Data de inicio planeado:</span>
                                                <span style={cardStyles.detailValue}>{item.expectedStartDate}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Iniciada em:</span>
                                                <span
                                                    style={cardStyles.detailValue}>{item.startedDate ? item.startedDate : "Não iniciado"}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Data de termino planeada:</span>
                                                <span style={cardStyles.detailValue}>{item.expectedEndDate}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Concluido em:</span>
                                                <span
                                                    style={cardStyles.detailValue}>{item.actualEndDate ? item.actualEndDate : "Não concluído"}</span>
                                            </p>
                                            <p className="card-category">
                                                <span style={cardStyles.detailTitle}>Itens Planeados/concluidos:</span>
                                                <span
                                                    style={cardStyles.detailValue}>{item.activities?.length + " / " + item.finishedActivities}</span>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <Box style={cardStyles.detailsButton}>
                                        <Row>
                                            <Box sx={{marginTop: '4%'}}>
                                                <a href='##' onClick={() => onClickDetails(item.id)}>
                                                    ver Actividades
                                                </a>
                                            </Box>
                                            <IconButton color="warning" component="label">
                                                <SettingsIcon fontSize={"small"} />
                                            </IconButton>
                                        </Row>

                                    </Box>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                })}
            </Row>
        )
    }
    return (
        <div className="content">
            <Box sx={{backgroundColor: '#FFFFFF', width: '100%', margin: 'auto', marginTop: '1%', borderRadius: 4, borderLeftWidth: 8,
                borderLeft: addComponent?'8px solid #F39C12': 'none', paddingTop: '2%'}}>

                {addComponent &&
                    <Box sx={{width: '100%', padding: '2%', marginTop: '1%', borderRadius: 1, display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{width: '100%'}}>
                            <form>
                                <FormGroup>
                                    <Label for="exampleEmail" style={cardStyles.inputLabels} >Título</Label>
                                    <Input
                                        style={cardStyles.inputStyles}
                                        type="text"
                                        name="text"
                                        id="exampleEmail"
                                        placeholder="Título do componente"
                                        value={title}
                                        onChange={(value)=>setTitle(value.target.value)}
                                    />
                                    <FormText color="muted">
                                        ex: Plano de inserção de novos ingressos
                                    </FormText>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleText" style={cardStyles.inputLabels}>Descrição</Label>
                                    <Input type="textarea" name="text" id="exampleText"
                                           style={cardStyles.inputStyles}
                                           onChange={(value)=>setDescription(value.target.value)}
                                    />
                                </FormGroup>

                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Row>
                                        <Box style={{marginLeft: '4%'}}>
                                            <FormGroup>
                                                <Label for="exampleText" style={cardStyles.inputLabels}>Espectativa de início</Label>
                                                <Input type="date" name="text" id="exampleText"
                                                       style={cardStyles.inputStyles}
                                                />
                                            </FormGroup>

                                        </Box>

                                        <Box style={{marginLeft: '4%'}}>
                                            <FormGroup>
                                                <Label for="exampleText" style={cardStyles.inputLabels}>Espectativa de fim</Label>
                                                <Input type="date" name="text" id="exampleText"
                                                       style={cardStyles.inputStyles}
                                                />
                                            </FormGroup>
                                        </Box>

                                    </Row>
                                </Box>

                                {
                                    addComponent && <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1%'}}>
                                        <Row>
                                            <IconButton color="warning" component="label">
                                                <InfoIcon fontSize={"large"}/>
                                            </IconButton>
                                            <p style={cardStyles.infoLabels}>Criação do componente</p>
                                            <p style={cardStyles.infoLabels}>Informe os campos abaixo. A posterior, pode criar as actividades
                                                para este componente, de modo a seguir o workflow</p>
                                        </Row>
                                    </Box>
                                }

                                <Box sx={{display: 'flex', justifyContent: 'center'}}>

                                    {addComponent &&
                                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                            <IconButton color="warning" aria-label="upload picture" component="label" onClick={() => setAddComponent(false)}>
                                                <CloseIcon fontSize={"large"}/>
                                            </IconButton>
                                        </Box>
                                    }
                                    <Button
                                        style={{borderRadius: 5}}
                                        color="success" link onClick={handleCreateComponent}>
                                        Gravar
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                }

                {!addComponent &&
                    <TabContext value={value}>
                        <Box sx={{marginLeft: '2%', fontWeight: 'bold' }} >
                            <Tabs
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: value=='one'?"#F39C12": value=='two'?'#2E86C1':'#8E44AD',
                                        borderWidth: 4,
                                    }
                                }}
                                value={value}
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="secondary tabs example"
                                centered={true}
                            >
                                <Tab value="one" label="Sem actividades" style={{color: '#167415',
                                    textTransform: 'none'}} />

                                <Tab
                                    value="two"
                                    label="Em Execução"
                                    style={{color: '#167415',  textTransform: 'none'}}
                                />
                                <Tab value="three" label="Concluídos" style={{color: '#167415', textTransform: 'none'}} />

                            </Tabs>
                        </Box>

                        <TabPanel value={"one"}>
                            <Box>
                                <Box>
                                    {!addComponent && <Button

                                        color="success" link onClick={() => setAddComponent(true)}
                                        style={{borderRadius: 7}}
                                    >
                                        <span style={{color: '#FFFFFF'}}>Adicionar componente</span>
                                        <AddCircleIcon fontSize={'small'}/>
                                    </Button>}
                                </Box>
                                <ComponentBoard />
                            </Box>

                        </TabPanel>
                        <TabPanel value="two">
                            <ComponentBoard />

                        </TabPanel>
                        <TabPanel value="three">
                            <ComponentBoard />
                        </TabPanel>

                    </TabContext>
                }

            </Box>
        </div>
    );
}

export default Component;
function ComponentAction(email: string, password: any): any {
    throw new Error("Function not implemented.");
}

