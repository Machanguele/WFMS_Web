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
import {ganttomponentsAction} from "../store/actionCreators/component.actionCreator";
import {useDispatch} from "react-redux";
import {GanttOriginal, Task, ViewMode} from "react-gantt-chart";
// core components

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Estatistica() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const {components, isLoading, errorMessage, componentId, gantComponents } = useTypeSelector(
        (state) => state.component
    );
    const [taskData, setTasksData] = React.useState<Task[]>([]);


    const fillTasksHandler = ()=>{
        let dataToReturn: Task[] = [];
        if(gantComponents != null && gantComponents.length > 0){
            gantComponents.map((item)=>{
                let dateHelper = new Date()
                let aux:Task= {
                    type: "project",
                    id: `project${item.component?.id}`,
                    name: item.component?.title,
                    start: new Date(item.component.expectedStartDate),
                    end: new Date(item.component.expectedEndDate),
                    progress: 25,
                    hideChildren: true,
                    line: 10
                }
                dataToReturn.push(aux);

                item?.activities.map((item, id)=>{
                    dataToReturn.push({
                        type: "task",
                        id: `task${item.id}`,
                        name: `Actividade ${id+1}`,
                        start: new Date(item.expectedStarDate),
                        end: new Date(item.expectedEndDate),
                        progress: item.status?.progress,
                        project: aux.id,
                    })
                })
                setTasksData(dataToReturn)
            })
        }
    }

    useEffect(()=>{
        dispatch(ganttomponentsAction())

    }, [])

    useEffect(()=>{
        if(gantComponents != null && gantComponents.length> 0){
            fillTasksHandler()}
    }, [gantComponents])

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumo de actividades do 1o. Semestre do ano lectivo 2022',
      },
    },
  };

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
  const data1 =[100, 78, 200, 69, 44, 230]
  const data2 =[90, 78, 197, 65, 44, 220]

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
        backgroundColor: value =="two"? 'rgba(255, 203, 35, 1)': 'rgba(255, 203, 35, 0.5)',
      },
      {
        label: 'Concluidas',
        data: data2,
        backgroundColor: value=="two"? 'rgba(22, 116, 21, 1)': 'rgba(22, 116, 21, 0.5)',
      },
    ],
  };



  return (
    <>
      <div className="content">

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
                      <Tab
                          value="one"
                          label="Resumo por barras"
                          style={{color: '#167415',  textTransform: 'none'}}
                      />
                      <Tab value="two" label="Resumo por linhas" style={{color: '#167415', textTransform: 'none'}} />
                      <Tab value="three" label="Fluxo de Execução" style={{color: '#167415', textTransform: 'none'}}/>
                      <Tab value="four" label="Fluxo de Planeamento" style={{color: '#167415', textTransform: 'none'}}/>
                      <Tab value="five" label="Componentes por actividades" style={{color: '#167415', textTransform: 'none'}}/>
                  </Tabs>
              </Box>

              <TabPanel value="one">
                  <Bar options={options} data={data} height={120} />
              </TabPanel>
              <TabPanel value="two">
                  <Line options={options} data={data} height={120}/>
              </TabPanel>
              <TabPanel value="three">
                  <Bar options={options} data={dataExecution} height={120} />
              </TabPanel>
              <TabPanel value="four">
                  <Bar options={options} data={dataPlaned} height={120}/>
              </TabPanel>

              <TabPanel value="five">
                  <>
                      {taskData != null && taskData.length>0?
                          <GanttOriginal
                              tasks={taskData}
                              viewMode={ViewMode.Month}
                              columnWidth={200}
                              ganttHeight={500}
                              locale={"pt-PT"}
                          />:
                          <></>}
                  </>
              </TabPanel>
          </TabContext>
      </div>
    </>
  );
}

export default Estatistica;
