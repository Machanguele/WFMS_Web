// @flow
import moment from "moment";
import React, {useEffect, useState} from "react";
import ReactGantt, { GanttRow } from 'react-gantt';
import Gantt from 'react-gantt-antd'
import 'react-gantt-antd/lib/css/style.css'
import TimeLine from  '@parapet3/j-react-gantt-timeline'
import { GanttOriginal, Task, ViewMode } from "react-gantt-chart";

export  function GanttComponentAct(){


    let tasks: Task[] = [
        {
            type: "project",
            id: "ProjectSample",
            name: "Recepcao de novos estufdantes",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 12, 30),
            progress: 25,
            hideChildren: false,
        },
        {
            type: "task",
            id: "Task 0",
            name: "1.1 Task",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 45,
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 1",
            name: "1.2 Task",
            start: new Date('2021-07-01'),
            end: new Date(2021, 7, 30),
            progress: 25,
            dependencies: ["Task 0"],
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 2",
            name: "1.3 Task",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 7, 30),
            progress: 10,
            dependencies: ["Task 1"],
            project: "ProjectSample",
        },
        {
            type: "milestone",
            id: "Task 6",
            name: "1.3.1 MileStone (KT)",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 100,
            dependencies: ["Task 2"],
            project: "ProjectSample",
        },
    ];

    let data = [
        { id: 1, start: new Date(2022, 10, 1), end: new Date(2022, 10, 10), name: "Demo Task 1" },
        { id: 2, start: new Date(2022, 10, 6), end: new Date(2022, 10, 11), name: "Demo Task 2" },
        { id: 3, start: new Date(2022, 10, 6), end: new Date(2022, 10, 11), name: "Demo Task 2" },
        { id: 4, start: new Date(2022, 10, 6), end: new Date(2022, 10, 11), name: "Demo Task 2" },
        { id: 5, start: new Date(2022, 10, 6), end: new Date(2022, 10, 11), name: "Demo Task 2" },
        { id: 6, start: new Date(2022, 10, 6), end: new Date(2022, 10, 11), name: "Demo Task 2" },
    ];
    let links = [
        { id: 1, start: 1, end: 2, color:'#ff00fa', selectedColor:'#ff00fa'},
        { id: 2, start: 1, end: 3, color:'#ff00fa', selectedColor:'#ff00fa' }
    ];



    return (

        /*<TimeLine

            data={data} links={links} />*/
        <GanttOriginal
            tasks={tasks}
            viewMode={ViewMode.Month}
            columnWidth={200}
            ganttHeight={200}
        />


    );
};