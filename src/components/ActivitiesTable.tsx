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
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {Row} from "react-bootstrap";
import TextField from '@mui/material/TextField';


import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import BuildIcon from '@mui/icons-material/Build';

import {
    FormGroup,
    Label,
    Input
} from "reactstrap";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {activityAction, activityStatusAction, allocateUserAction} from "../store/actionCreators/activity.actionCreator";



const tablesStyles = {
    container: {
        borderRadius: 5,
        marginTop: '1%',
    },
    tabStyle:{
        color: '#B35B45',
    },
    modalContent:{
        marginLeft: '2%',
    },
    modalTitle:{
        color: '#148F77',
        height: '2%',
        fontSize: '12pt',
        fontFamily: 'sans-serif'
    },
    modalInfo:{
        color: '#A3A6A6',
        fontSize: '12pt',
        marginLeft: '1%'
    },
    modalInfoWarn:{
        color: '#E74C3C',
        fontSize: '12pt',
        marginLeft: '1%'
    }
}

interface RowTypes{
    id: number,
    activity: string,
    expectedStartDay: string,
    stardDay: string,
    expectedEndDay: string,
    endDay: string,
    allocatedTo: string,
    description: string,
    createdAt: string,
    status: string
}

interface IFindActivitiesPros {
    data: RowTypes[];
}
interface ModalProps {
    row: RowTypes;
}


export default function ActivitiesTable() {

    const [value, setValue] = React.useState('one');
    const [dataTodo, setDataTodo] = React.useState<RowTypes[]>([]);
    const [dataInProgress, setDataInProgress] = React.useState<RowTypes[]>([]);
    const [dataInReview, setDataInReview] = React.useState<RowTypes[]>([]);
    const [dataFinished, setDataFinished] = React.useState<RowTypes[]>([]);
    const [showModal, setShowModal] = React.useState(false);
    const [selectedActivity, setSelectedActivity] = React.useState<RowTypes>();
    const [isChanged, setIsChanged] = React.useState(false);
    const [saveStatus, setSaveStatus] = React.useState(false);
    const [saveAllocated, setSaveAllocated] = React.useState(false);

    const {activities,isLoading, errorMessage} = useTypeSelector(
        (state) => state.activity
    );
    const [status, setStatus] = React.useState('');
    const [selectedEmail, setSelectedEmail] = React.useState('');

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
        console.log("Valor selecionado", event.target.value)
    };
    const handleChangeUser = (event: SelectChangeEvent) => {
        setSelectedEmail(event.target.value);
        console.log("Valor selecionado", event.target.value)
    };




    useEffect(()=>{
        //setDataTodo(rows)
        fillRows();
    }, [activities])

    const dispatch = useDispatch();
    const history = useHistory();

    const updateActivitieHandler = () => {
        console.log("Selectedactivity", selectedActivity);
        if(selectedActivity != null && status != ""){
            setShowModal(false)
            dispatch(activityStatusAction(status, selectedActivity.id));
            setTimeout(()=>{
                setStatus("")
                setSaveStatus(false)
                setSaveAllocated(false)
                dispatch(activityAction(22))
            }, 1000)
        }
    };

    const allocateActivitieHandler = () => {
        console.log("Selectedactivity", selectedActivity);
        if(selectedActivity != null && selectedEmail != ""){
            setShowModal(false)
            dispatch(allocateUserAction(selectedEmail, selectedActivity.id));
            setTimeout(()=>{
                setStatus("")
                setSaveStatus(false)
                setSaveAllocated(false)
                dispatch(activityAction(22))
            }, 1000)
        }
    };
   /* useEffect(()=>{
        activitiesHandler()
    }, [])*/

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleSelectedActivity = (row: RowTypes) =>{
        setSelectedActivity(row)
        setShowModal(true);
    }

    function createData(
        id: number,
        activity: string,
        expectedStartDay: string,
        stardDay: string,
        expectedEndDay: string,
        endDay: string,
        allocatedTo: string,
        description: string,
        createdAt: string,
        status: string
    ) {
        return { id, activity, expectedStartDay, stardDay, expectedEndDay, endDay, allocatedTo, description, createdAt, status};
    }


    const fillRows = ()=>{
        let dataTodo:RowTypes[] =[];
        let dataInProgress:RowTypes[] =[];
        let dataInReview:RowTypes[] =[];
        let dataFinished:RowTypes[] =[];

        activities.map((item, key)=>{
            if(item.status.name==="Por fazer"){
                item.activities.map((act, key)=>{
                    dataTodo.push(createData(act.id, act.name, act.expectedStarDate, act.starAt, act.expectedEndDate,
                        act.endAt, act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Em andamento"){
                item.activities.map((act, key)=>{
                    dataInProgress.push(createData(act.id, act.name, act.expectedStarDate, act.starAt, act.expectedEndDate,
                        act.endAt, act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Em Revisão"){
                item.activities.map((act, key)=>{
                    dataInReview.push(createData(act.id, act.name, act.expectedStarDate, act.starAt, act.expectedEndDate,
                        act.endAt, act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Concluido"){
                item.activities.map((act, key)=>{
                    dataFinished.push(createData(act.id, act.name, act.expectedStarDate, act.starAt, act.expectedEndDate,
                        act.endAt, act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
        })
        setDataTodo(dataTodo);
        setDataInProgress(dataInProgress);
        setDataInReview(dataInReview);
        setDataFinished(dataFinished)
    }





    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: value==='one'?'#5499C7': value=='two'? '#45B39D': value==='three'? '#17A589' :'#148F77',
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

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const displayDate = (data: string | undefined)=>{
        return data && data != "-"?
            new Date(data).toLocaleDateString("pt-PT"):
            data
    }


    const ModalActivities = ()=>{
        return(
            <BootstrapDialog
                onClose={()=>setShowModal(false)}
                aria-labelledby="customized-dialog-title"
                open={showModal}
                style={{width: '100%',  margin: 'auto', borderRadius: 10

            }}
            >
                <DialogTitle
                    sx={{color: '#148F77', height: '2%', fontSize: '12pt'}}
                >
                    Actividade: {selectedActivity?.activity}
                </DialogTitle>
                <DialogContent dividers style={tablesStyles.modalContent}>
                        <Box style={tablesStyles.modalTitle}>
                            <Row>Estado:
                                <span style={tablesStyles.modalInfo}>{selectedActivity?.status}</span>
                                <IconButton aria-label="fingerprint" color="success">
                                    <EditIcon
                                        fontSize={"small"}
                                        color={"warning"}
                                        onClick={()=>setSaveStatus(true)}
                                    />
                                </IconButton>
                            </Row>
                            {/*<FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Age
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                </NativeSelect>
                            </FormControl>*/}
                            {saveStatus &&

                                <FormGroup>
                                    <Label for="exampleSelectMulti1">Estado selecionado: {status}</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti1" multiple
                                           onChange={handleChangeStatus}
                                    >
                                        <option value={"Por fazer"}>Por fazer</option>
                                        <option value={"Em andamento"}>Em andamento</option>
                                        <option value={"Em Revisão"}>Em Revisão</option>
                                        <option value={"Concluido"}>Concluido</option>
                                    </Input>
                                </FormGroup>}
                        </Box>
                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Descrição: <span style={tablesStyles.modalInfo}>
                            {/*<TextField
                                variant="standard"
                                disabled
                                id="outlined-disabled"
                                value={selectedActivity?.description}
                            />*/}
                            {selectedActivity?.description}
                            </span>
                        </Row>
                    </Box>

                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Criada aos: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.createdAt)}</span>
                        </Row>
                    </Box>

                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Estimativa de Início : <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.expectedStartDay)}</span>
                        </Row>
                    </Box>
                    {selectedActivity?.stardDay != "-" &&
                        <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Início em: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.stardDay)}</span>
                        </Row>
                    </Box>}

                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Estimativa de Fim: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.expectedEndDay)}</span>
                        </Row>
                    </Box>

                    {selectedActivity?.endDay != "-" &&
                        <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Fim em: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.endDay)}</span>
                        </Row>
                    </Box>}

                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Alocado: <span style={tablesStyles.modalInfo}>
                            {selectedActivity?.allocatedTo? selectedActivity.allocatedTo : 'N/A'}
                        </span>
                            <IconButton aria-label="fingerprint" color="success">
                                <EditIcon
                                    fontSize={"small"}
                                    color={"warning"}
                                    onClick={()=>setSaveAllocated(true)}
                                />
                            </IconButton>
                        </Row>

                        {saveAllocated &&

                            <FormGroup>
                                <Label for="exampleSelectMulti1">Allocar a/ao: </Label>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti1" multiple
                                       onChange={handleChangeUser}
                                >
                                    <option value={"josemachanguele@gmail.com"}>Jose Machanguele</option>
                                    <option value={"admin@feuem.co.mz"}>Admin FEUEM</option>
                                </Input>
                            </FormGroup>}
                    </Box>

                    <Typography gutterBottom>
                        <Row style={tablesStyles.modalInfoWarn}>
                            Nota(*): <span style={tablesStyles.modalInfo}>
                            Após alterar qualquer dos campos, deve salvar as alterações para que sejam refletidas no sistema
                        </span>
                        </Row>
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={()=>setShowModal(false)}>
                        Cancelar
                    </Button>

                    {saveStatus && <Button autoFocus onClick={updateActivitieHandler}>
                        Gravar
                    </Button>}

                    {saveAllocated && <Button autoFocus onClick={allocateActivitieHandler}>
                        Gravar
                    </Button>}
                </DialogActions>
            </BootstrapDialog>
        )

    }


    const FindActivities=({data}: IFindActivitiesPros)=>{
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
                            <StyledTableCell align="left">Ver</StyledTableCell>
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
                                <StyledTableCell align="left" sx={{width: '12%'}}>{new Date(row.expectedStartDay).toLocaleDateString("pt-PT")}</StyledTableCell>
                                <StyledTableCell align="left">{row.stardDay != "-"? new Date(row.stardDay).toLocaleDateString("pt-PT"): row.stardDay}</StyledTableCell>
                                <StyledTableCell align="left">{new Date(row.expectedEndDay).toLocaleDateString("pt-PT")}</StyledTableCell>
                                <StyledTableCell align="left">{row.endDay != "-"? new Date(row.endDay).toLocaleDateString("pt-PT"): row.endDay}</StyledTableCell>
                                <StyledTableCell align="left">{row.allocatedTo}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <IconButton aria-label="fingerprint" color="success">
                                        <BuildIcon
                                            color={"warning"}
                                            onClick={()=>handleSelectedActivity(row)}
                                        />
                                    </IconButton>

                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }

    return (
        <div className="content content-center" style={tablesStyles.container}>
            {
                isLoading?
                    <Box sx={{ display: 'flex', marginLeft: '45%', marginTop: '10%' }}>
                        <CircularProgress color={"success"}/>
                    </Box>

                    :
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

                            <TabPanel value="one"><FindActivities data={dataTodo}/></TabPanel>
                            <TabPanel value="two"><FindActivities data={dataInProgress}/></TabPanel>
                            <TabPanel value="three"><FindActivities data={dataInReview}/></TabPanel>
                            <TabPanel value="four"><FindActivities data={dataFinished}/></TabPanel>
                        </TabContext>
                    </Box>
            }

            <ModalActivities  />
        </div>



    );
}
