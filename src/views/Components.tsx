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
import {componentAction} from "../store/actionCreators/component.actionCreator";

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
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
  },
  cardDetails:{
      display: 'flex',
      justifyContent: 'flexStart'
  }
}

function Component() {

  const [email, setEmail] = useState("");
  const { components, isLoading, errorMessage } = useTypeSelector(
      (state) => state.component
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const componentHandler = () => {
    dispatch(componentAction());
  };

  useEffect(()=>{
    componentHandler()
  }, [])

  const onClickDetails = ()=>{
      history.push("/admin/actividades")
  }
  return (
    <>
      <div className="content">
        <Row>
          <Button color="success" link>
            Adicionar componente
            <i className="far fa-clock" />
          </Button>
        </Row>

        <Row>
          {components.map((item, id)=>{
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
                            <span style={cardStyles.detailValue}>{item.startedDate? item.startedDate : "Não iniciado"}</span>
                        </p>
                          <p className="card-category">
                              <span style={cardStyles.detailTitle}>Data de termino planeada:</span>
                              <span style={cardStyles.detailValue}>{item.expectedEndDate}</span>
                          </p>
                          <p className="card-category">
                              <span style={cardStyles.detailTitle}>Concluido em:</span>
                              <span style={cardStyles.detailValue}>{item.actualEndDate? item.actualEndDate: "Não concluído"}</span>
                          </p>
                          <p className="card-category">
                              <span style={cardStyles.detailTitle}>Itens Planeados/concluidos:</span>
                              <span style={cardStyles.cardStyle}>{item.activities?.length+" / "+item.finishedActivities}</span>
                          </p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                          <div style={cardStyles.detailsButton}>
                            <a href='##' onClick={onClickDetails}>
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

          {/*<Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">

                      <i className="nc-icon nc-money-coins text-success" />

                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Plano do Proximo semestre</p>
                      <CardTitle tag="p">50/50</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">

                  <i className="far fa-calendar" /> Last day

                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">

                      <i className="nc-icon nc-vector text-danger" />

                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Departamento Social</p>
                      <CardTitle tag="p">10/11</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">

                  <i className="far fa-clock" /> In the last hour

                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">

                      <i className="nc-icon nc-favourite-28 text-primary" />

                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Eventos</p>
                      <CardTitle tag="p">5/5</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">

                  <i className="fas fa-sync-alt" /> Update now

                </div>
              </CardFooter>
            </Card>
          </Col>*/}
        </Row>
{/*
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
*/}
{/*
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
*/}
      </div>
    </>
  );
}

export default Component;
function ComponentAction(email: string, password: any): any {
    throw new Error("Function not implemented.");
}

