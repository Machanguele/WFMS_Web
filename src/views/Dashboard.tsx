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
import React, {useEffect, useState} from "react";
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
    const [countPlaned, setCountPlanned] = useState(0);
    const [countFinished, setCountFinished] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const {countActivities, isLoading } = useTypeSelector(
        (state) => state.activity
    );

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(activitySumAction())
    }, [])

    useEffect(()=>{
        if (countActivities != null) {
            if (countActivities.length > 0) {
                let finished = 0;
                let todo = 0;
                let inProgress = 0;
                let inReview = 0;
                countActivities.map((item)=>{
                    if(item.name === "Concluídas")
                        finished = item.quantity
                    if(item.name === "Por fazer")
                        todo = item.quantity
                    if(item.name === "Em andamento")
                        inProgress = item.quantity
                    if(item.name === "Em Revisão")
                        inReview = item.quantity
                })
                setCountPlanned(finished + todo + inProgress + inReview)
                setCountFinished(finished)
            }
        }

    }, [countActivities])



    const sumActivities: SummaryActivities[]=[
        {name: "Por fazer", quantity: 50, color: '#F39C12'},
        {name: "Em progresso", quantity: 15, color: '#3498DB'},
        {name: "Em Revisão", quantity: 5, color: '#2ECC71'},
        {name: "Em Concluidas", quantity: 30, color: '#27AE60'},
    ]

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumo de actividades do 2o. Semestre 2022',
      },
    },
  };

  const labels = ['Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro (Corrente)'];
  const data1 =[190, 178, 200, 79, countPlaned]
  const data2 =[185, 140, 197, 65, countFinished]

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

        </Row>

        <Line options={options} data={data}  height={100} />
      </div>
    </>
  );
}

export default Dashboard;
