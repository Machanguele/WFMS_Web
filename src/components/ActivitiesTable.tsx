import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../assets/css/tabStyles.css'
/*
import {Tabs, Tab} from "react-bootstrap-tabs";
*/
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useEffect} from "react";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";



const tablesStyles = {
    container: {
        borderRadius: 5,
        marginTop: '1%',
    },
    tabStyle:{
        color: '#B35B45',

    }
}


export default function ActivitiesTable() {

    const [value, setValue] = React.useState('one');
    const [data, setData] = React.useState<RowTypes[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const {activities,isLoading, errorMessage} = useTypeSelector(
        (state) => state.activity
    );

    interface RowTypes{
        id: number,
        activity: string,
        expectedStartDay: string,
        stardDay: string,
        expectedEndDay: string,
        endDay: string,
        allocatedTo: string,
    }

    function createData(
        id: number,
        activity: string,
        expectedStartDay: string,
        stardDay: string,
        expectedEndDay: string,
        endDay: string,
        allocatedTo: string,
    ) {
        return { id, activity, expectedStartDay, stardDay, expectedEndDay, endDay, allocatedTo};
    }

    useEffect(()=>{
        setData(rows)
    }, [])

    const rows = ()=>{
        let dataToReturn:RowTypes[] =[];
        activities.map((item, key)=>{
            if(item.status.name=="Por fazer"){
                item.activities.map((act, key)=>{
                    dataToReturn.push(createData(key+1, act.name, act.expectedStarDate, act.starAt, act.expectedEndDate,
                        act.endAt, act.allocatedTo))
                })
            }
        })
        return dataToReturn;
    }

   /* const rows = [
        createData(1, 'Calendario daesta vez mais bla bla blaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa', '20-08-2022', '20-08-2022',
            '20-08-2023', '20-08-2022', 'Por fazer', 'JM'),
        createData(2, 'Calendario', '20-08-2022', '20-08-2022',
            '20-08-2023', '20-08-2022', 'Por fazer', 'JM'),
        createData(3, 'Calendario', '20-08-2022', '20-08-2022',
            '20-08-2023', '20-08-2022', 'Por fazer', 'JM'),

    ];*/


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: value=='one'?'#5499C7': value=='two'? '#45B39D': value=='three'? '#17A589' :'#148F77',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#E8F8F5',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));




    const TodoActivities=()=>{
        return(
            <TableContainer component={Paper} sx={{marginLeft: '-2%'}}>
                <Table sx={{ minWidth: 650, marginLeft: 0, width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell sx={{width: '8%'}}>Actividade</StyledTableCell>
                            <StyledTableCell align="left" sx={{width: '12%'}}>Inicio Planeado</StyledTableCell>
                            <StyledTableCell align="left">Inicio</StyledTableCell>
                            <StyledTableCell align="left">Fim Planeado</StyledTableCell>
                            <StyledTableCell align="left">Fim</StyledTableCell>
                            <StyledTableCell align="left">Alocado</StyledTableCell>
                            <StyledTableCell align="left">Acção</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{width: '8%'}}>
                                    {row.activity}
                                </StyledTableCell>
                                <StyledTableCell align="left" sx={{width: '12%'}}>{row.expectedStartDay}</StyledTableCell>
                                <StyledTableCell align="left">{row.stardDay}</StyledTableCell>
                                <StyledTableCell align="left">{new Date(row.expectedEndDay).toLocaleDateString("pt-PT")}</StyledTableCell>
                                <StyledTableCell align="left">{row.endDay}</StyledTableCell>
                                <StyledTableCell align="left">{row.allocatedTo}</StyledTableCell>
                                <StyledTableCell align="left">{row.allocatedTo}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }

    return (
        <div className="content content-center" style={tablesStyles.container}>
            <Box>
                <TabContext value={value}>
                    <Box sx={{ width: 500, height: '.5%', textTransform: 'none' }} >
                        <Tabs
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#E3AF1A",
                                    borderWidth: 4

                                }
                            }}
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                            centered={false}
                        >
                            <Tab
                                value="one"
                                label="Por Fazer"
                                style={{backgroundColor: '#5499C7', color: '#F7F9F9',  textTransform: 'none', marginRight: '1%'}}

                            />

                            <Tab value="two" label="Em Progresso"
                                 style={{backgroundColor: '#45B39D', color: '#F7F9F9', textTransform: 'none',marginRight: '1%'}} />
                            <Tab value="three" label="Em Revisão"
                                 style={{backgroundColor: '#17A589',color: '#F7F9F9', textTransform: 'none', marginRight: '1%'}}/>
                            <Tab value="four" label="Concluídas"
                                 style={{backgroundColor: '#148F77',color: '#F7F9F9', textTransform: 'none', marginRight: '1%'}}/>
                        </Tabs>
                    </Box>

                    <TabPanel value="one"><TodoActivities/></TabPanel>
                    <TabPanel value="two"><TodoActivities/></TabPanel>
                    <TabPanel value="three"><TodoActivities/></TabPanel>
                    <TabPanel value="four"><TodoActivities/></TabPanel>
                </TabContext>


            </Box>


        </div>



    );
}
