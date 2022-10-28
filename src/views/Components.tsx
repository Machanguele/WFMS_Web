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
    componentAction,
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
// core components


const cardStyles = {
  detailsButton: {
    borderRadius: 5,
    marginLeft: '55%',
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
      borderLeft: '5px solid #F39C12',
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


  const {components, isLoading, errorMessage, componentId } = useTypeSelector(
      (state) => state.component
  );

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

    console.log("SelectedCompont", componentId)

  const onClickDetails = (component: number)=>{
      dispatch(setSelectedComponentAction(component))
      history.push(`/admin/actividades/${component}`)

  }
  return (
    <>
      <div className="content">
          <Box sx={{backgroundColor: '#FFFFFF', width: '100%', margin: 'auto', marginTop: '1%', borderRadius: 4, borderLeftWidth: 8,
              borderLeft: addComponent?'8px solid #F39C12': 'none'}}>
              <Box>
                  <Box sx={{marginLeft: '1%'}}>
                      {!addComponent && <Button

                          color="success" link onClick={() => setAddComponent(true)}
                          style={{borderRadius: 7}}
                      >
                          <span style={{color: '#FFFFFF'}}>Adicionar componente</span>
                          <AddCircleIcon fontSize={'small'}/>
                      </Button>}

                      {addComponent &&
                          <Box sx={{display: 'flex', justifyContent: 'center'}}>
                              <IconButton color="warning" aria-label="upload picture" component="label" onClick={() => setAddComponent(false)}>
                                  <CloseIcon fontSize={"large"}/>
                              </IconButton>
                          </Box>
                      }
                  </Box>
              </Box>

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

                                  {addComponent && <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1%'}}>
                                      <Row>
                                          <IconButton color="warning" component="label">
                                              <InfoIcon fontSize={"large"}/>
                                          </IconButton>
                                          <p style={cardStyles.infoLabels}>Criação do componente</p>
                                          <p style={cardStyles.infoLabels}>Informe os campos abaixo. A posterior, pode criar as actividades
                                              para este componente, de modo a seguir o workflow</p>
                                      </Row>
                                  </Box>}


                                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
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


              {!addComponent && <Row>
                  {components.map((item, id) => {
                      return <Col lg="3" md="6" sm="6" key={id}>
                          <Card className="card-stats" style={cardStyles.cardStyle}>
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
                                      <div style={cardStyles.detailsButton}>
                                          <a href='##' onClick={() => onClickDetails(item.id)}>
                                              ver Actividades
                                              {/*
                              <RemoveRedEyeOutlinedIcon className={"warning-color"} />
*/}
                                          </a>
                                      </div>


                                      {/*
                  <i className="fas fa-sync-alt" /> Update Now
*/}
                                  </div>
                              </CardFooter>
                          </Card>
                      </Col>
                  })}
              </Row>}
          </Box>
      </div>

    </>
  );
}

export default Component;
function ComponentAction(email: string, password: any): any {
    throw new Error("Function not implemented.");
}

