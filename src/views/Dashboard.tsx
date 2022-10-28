/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect} from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Box from "@mui/material/Box";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ActivitiesTable from "../components/ActivitiesTable";
import {GanttComponentAct} from "../components/Gantt";
import TabContext from "@mui/lab/TabContext";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {componentAction} from "../store/actionCreators/component.actionCreator";
import {activitySumAction} from "../store/actionCreators/activity.actionCreator";
// core components

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const cStyles ={
    cardStyle:{
        alignItems: 'left',
        marginLeft: 0,
        paddingLeft: '1%',
        display: 'flex',
        alignContent: 'left',
        justifyContent: 'flexStart',
        backgroundColor: "rgba(255, 255, 200, .8)",
/*
        borderLeftWidth: 8,
*/
        /*borderLeft: '5px solid',*/
        paddingTop: '3%',
        paddingBottom: '3%'

    },
    cardTitle:{
        marginRight: '2%',
        marginLeft: '2%',
        fontSize: '13pt',
        fontFamily: 'sans-serif',
        color: '#515A5A'
    },
}

interface SummaryActivities{
  name: string,
  quantity: number,
  color: string
}

function Dashboard() {


    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const {countActivities, isLoading } = useTypeSelector(
        (state) => state.activity
    );

    const [concluidas, setConcluidas] = React.useState<number>(0);
    const [planeadas, setPlaneadas] = React.useState<number>(0);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(activitySumAction())
    }, [])

    useEffect(()=>{
        if(countActivities != null && countActivities.length>0){
            var totPlaneadas = 0;
            countActivities.map((item)=>{
                if(item.name == "Concluídas")
                    setConcluidas(item.quantity)
                totPlaneadas += item.quantity;
            })
            setPlaneadas(totPlaneadas)

        }
    }, [countActivities])

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumo de actividades do 1o. Trimestre',
      },
    },
  };

  const labels = ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro (Corrente)'];
  const data1 =[190, 178, 200, 79, planeadas]
  const data2 =[185, 140, 197, 65, concluidas]

    const dataPlaned = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Fluxo de Planeamento',
                data: data1,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataExecution = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Fluxo de Execução',
                data: data2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
   const data = {
    labels,
    datasets: [
      {
        label: 'Paneadas',
        data: data1,
        backgroundColor: value =="two"? 'rgba(255, 203, 35, 1)': '#F39C12',
      },
      {
        label: 'Concluidas',
        data: data2,
        backgroundColor: value=="two"? 'rgba(22, 116, 21, 1)': '#27AE60',
      },
    ],
  };



  return (
    <>
      <div className="content">
        <Row>
          {countActivities?.map((item, id)=>
              <Col lg="3" md="6" sm="6" key={id + 1}>
                <Card className="card-stats" style={{ borderLeft: `7px solid ${item.color}`, ...cStyles.cardStyle}}>
                  <CardBody key={id + 1}>
                    <Box>
                        <Row>
                          <span style={cStyles.cardTitle}>{item.name}</span>
                        </Row>
                    </Box>
                  </CardBody>
                  <CardFooter>
                    <hr/>
{/*
                      <span style={cStyles.cardTitle}>Total</span>
*/}
                      <span style={{color: item.color, marginRight: '2%', marginLeft: '2%', fontSize: '13pt',
                          fontFamily: 'sans-serif',
                      }}>{item.quantity}</span>
                    {/*<div className="stats">

                    <i className="fas fa-sync-alt" /> Update Now

                  </div>*/}
                  </CardFooter>
                </Card>
              </Col>)}
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

        <Line options={options} data={data}  height={100} />
          {/*<TabContext value={value}>
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
                      <Tab value="two" label="Resumo por linhas" style={{color: '#167415', textTransform: 'none'}} />
                      <Tab
                          value="one"
                          label="Resumo por barras"
                          style={{color: '#167415',  textTransform: 'none'}}
                      />
                      <Tab value="three" label="Fluxo de Execução" style={{color: '#167415', textTransform: 'none'}}/>
                      <Tab value="four" label="Fluxo de Planeamento" style={{color: '#167415', textTransform: 'none'}}/>
                  </Tabs>
              </Box>

              <TabPanel value="one">
                  <Bar options={options} data={data} />
              </TabPanel>
              <TabPanel value="two">
                  <Line options={options} data={data} />
              </TabPanel>
              <TabPanel value="three">
                  <Bar options={options} data={dataExecution} />
              </TabPanel>
              <TabPanel value="four">
                  <Bar options={options} data={dataPlaned} />
              </TabPanel>
          </TabContext>*/}
      </div>
    </>
  );
}

export default Dashboard;
