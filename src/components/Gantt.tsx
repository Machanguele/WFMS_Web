// @flow
import React, {useEffect, useState} from "react";
import 'react-gantt-antd/lib/css/style.css'
import { GanttOriginal, Task, ViewMode } from "react-gantt-chart";
import {useTypeSelector} from "../hooks/useTypeSelector";

export  function GanttComponentAct(){
    const [taskData, setTasksData] = React.useState<Task[]>([]);

    const {activities,isLoading, errorMessage, gantActivities} = useTypeSelector(
        (state) => state.activity
    );

    const {componentId } = useTypeSelector(
        (state) => state.component
    );

    const fillTasksHandler = ()=>{
        let dataToReturn: Task[] = [];
        if(gantActivities != null && gantActivities.component != null){
            let dateHelper = new Date()
            let aux:Task= {
                type: "project",
                id: `project${gantActivities.component?.id}`,
                name: gantActivities.component?.title,
                start: new Date(gantActivities.component.expectedStartDate),
                end: new Date(gantActivities.component.expectedEndDate),
                progress: 25,
                hideChildren: false,
            }
            dataToReturn.push(aux);
            gantActivities?.activities.map((item, id)=>{
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
        }
    }

    useEffect(()=>{
        if(componentId != 0)
            fillTasksHandler()
    }, [componentId])

    console.log("tasks", taskData)




/*
    let tasks: Task[] = [
        {
            type: "project",
            id: "ProjectSample",
            name: "Recepcao de novos Estudantes",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 12, 30),
            progress: 25,
            hideChildren: true,
        },
        {
            type: "task",
            id: "Task 0",
            name: "Reuniao dos finalistas",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 0,
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 1",
            name: "Organizacao do dia aberto",
            start: new Date('2021-07-01'),
            end: new Date(2021, 7, 30),
            progress: 25,
            dependencies: ["Task 0"],
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 2",
            name: "Publicação de Pautas",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 7, 30),
            progress: 50,
            dependencies: ["Task 1"],
            project: "ProjectSample",
        },
        {
            type: "milestone",
            id: "Task 6",
            name: "Recepção de novos estudantes",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 75,
            dependencies: ["Task 2"],
            project: "ProjectSample",
        },
    ];
*/




    return (
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



    );
};