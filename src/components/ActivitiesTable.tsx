import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../assets/css/tabStyles.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Row} from "react-bootstrap";


import Select, { SelectChangeEvent } from '@mui/material/Select';
import BuildIcon from '@mui/icons-material/Build';

import {
    FormGroup,
    Label,
    Input, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Button
} from "reactstrap";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {
    activityAction,
    activityStatusAction,
    allocateUserAction,
    uploadActivityAction
} from "../store/actionCreators/activity.actionCreator";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';



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
/*
    stardDay: string,
*/
    expectedEndDay: string,
/*
    endDay: string,
*/
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
    const [isUploadingFile, setIsUploadingFile] = React.useState(false);
    const [isAddingFile, setIsAddingFile] = React.useState(false);

    const {activities,isLoading, errorMessage} = useTypeSelector(
        (state) => state.activity
    );
    const [status, setStatus] = React.useState('');
    const [selectedEmail, setSelectedEmail] = React.useState('');
    const [uploadedFile, setUploadedFile] = React.useState<File>();

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
        console.log("Valor selecionado", event.target.value)
    };
    const handleChangeUser = (event: SelectChangeEvent) => {
        setSelectedEmail(event.target.value);
        console.log("Valor selecionado", event.target.value)
    };

    const {componentId } = useTypeSelector(
        (state) => state.component
    );




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
                dispatch(activityAction(componentId))
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
                dispatch(activityAction(componentId))
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
/*
        stardDay: string,
*/
        expectedEndDay: string,
/*
        endDay: string,
*/
        allocatedTo: string,
        description: string,
        createdAt: string,
        status: string
    ) {
        return { id, activity, expectedStartDay, expectedEndDay, allocatedTo, description, createdAt, status};
    }


    const fillRows = ()=>{
        let dataTodo:RowTypes[] =[];
        let dataInProgress:RowTypes[] =[];
        let dataInReview:RowTypes[] =[];
        let dataFinished:RowTypes[] =[];

        activities.map((item, key)=>{
            if(item.status.name==="Por fazer"){
                item.activities.map((act, key)=>{
                    dataTodo.push(createData(act.id, act.name, act.expectedStarDate, act.expectedEndDate, act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Em andamento"){
                item.activities.map((act, key)=>{
                    dataInProgress.push(createData(act.id, act.name, act.expectedStarDate, act.expectedEndDate,
                        act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Em Revisão"){
                item.activities.map((act, key)=>{
                    dataInReview.push(createData(act.id, act.name, act.expectedStarDate, act.expectedEndDate,
                        act.allocatedTo, act.description, act.createdAt, act.status?.name))
                })
            }
            if(item.status.name==="Concluídas"){
                item.activities.map((act, key)=>{
                    dataFinished.push(createData(act.id, act.name, act.expectedStarDate, act.expectedEndDate,
                        act.allocatedTo, act.description, act.createdAt, act.status?.name))
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
            backgroundColor: value==='one'?'rgba(20,143,119,.7)': value==='two'? '#45B39D': value==='three'? '#17A589' :'#148F77',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#FEF9E7',
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

    const closeActivitiesHandler =()=>{
        setIsAddingFile(false)
        setIsUploadingFile(false)
    }
    const saveFile = (e) =>{
        setUploadedFile(e.target.files[0])
    }

    const handleUploadFiles =()=>{
        if(uploadedFile != null){
            let data: FormData;
            data = new FormData();

            data.append("componentId", `${componentId}`)
            data.append("file", uploadedFile)
            console.log("O formmmmmmmmmmmmmmmmm File", data)
            dispatch(uploadActivityAction(data))
        }
    }

    console.log("Ficheiroooooooooooooo", uploadedFile)


    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);




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
                            {saveStatus &&

                                <FormGroup>
                                    <Label for="exampleSelectMulti1">Estado selecionado: {status}</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti1" multiple
                                           onChange={handleChangeStatus}
                                    >
                                        <option value={"Por fazer"}>Por fazer</option>
                                        <option value={"Em andamento"}>Em andamento</option>
                                        <option value={"Em Revisão"}>Em Revisão</option>
                                        <option value={"Concluídas"}>Concluídas</option>
                                    </Input>
                                </FormGroup>}
                            {/*<Dropdown
                                nav
                                isOpen={saveStatus}
                                toggle={() => setSaveStatus(!saveStatus)}

                            >
                                <DropdownToggle caret nav>
                                    <i className="nc-icon nc-bell-55" />
                                    <p>
                                        <span className="d-lg-none d-md-block">Some Actions</span>
                                    </p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a">Action</DropdownItem>
                                    <DropdownItem tag="a">Another Action</DropdownItem>
                                    <DropdownItem tag="a">Something else here</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>*/}
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
                    {/*{selectedActivity?.stardDay != "-" &&
                        <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Início em: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.stardDay)}</span>
                        </Row>
                    </Box>}*/}

                    <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Estimativa de Fim: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.expectedEndDay)}</span>
                        </Row>
                    </Box>

                    {/*{selectedActivity?.endDay != "-" &&
                        <Box>
                        <Row style={tablesStyles.modalTitle}>
                            Fim em: <span style={tablesStyles.modalInfo}>
                            {selectedActivity && displayDate(selectedActivity?.endDay)}</span>
                        </Row>
                    </Box>}*/}

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
                                    <option value={"admin@feuem.co.mz"}>Admin FEUEM</option>
                                    <option value={"josemachanguele@gmail.com"}>Jose Machanguele</option>
                                    <option value={"admin@feuem.co.mz"}>Jacinta de Sousa</option>
                                    <option value={"admin@feuem.co.mz"}>Julio Carlos</option>
                                    <option value={"admin@feuem.co.mz"}>Ana Clara</option>
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

    const UploadActivities =()=>{
        return(
            <Box>
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>

                    {uploadedFile?.name && <p>Ficheiro carregado: {uploadedFile?.name}</p>}


                    <IconButton color="warning" aria-label="upload picture" component="label">
                        <input
                            hidden
                            accept=".xlsx, .xls, .csv"
                            type="file"
                            onChange={saveFile}
                        />
                        <AttachFileIcon fontSize={"large"}/>
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Row>
                        <p style={{marginTop:'1.8%', ...tablesStyles.modalTitle}}>
                            Carregue o arquivo de actividades (Somente nos formatos: .xlsx, .xls e .csv)</p>
                    </Row>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{borderRadius: 5}}
                        color="success" link onClick={handleUploadFiles}>
                        Gravar
                    </Button>
                </Box>
            </Box>
        )
    }

    const AddActivity =()=>{
        return(
            <Box>

            </Box>
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
{/*
                            <StyledTableCell align="left">Inicio</StyledTableCell>
*/}
                            <StyledTableCell align="left">Fim Planeado</StyledTableCell>
{/*
                            <StyledTableCell align="left">Fim</StyledTableCell>
*/}
                            <StyledTableCell align="left">Estado</StyledTableCell>
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
{/*
                                <StyledTableCell align="left">{row.stardDay != "-"? new Date(row.stardDay).toLocaleDateString("pt-PT"): row.stardDay}</StyledTableCell>
*/}
                                <StyledTableCell align="left">{new Date(row.expectedEndDay).toLocaleDateString("pt-PT")}</StyledTableCell>
{/*
                                <StyledTableCell align="left">{row.endDay != "-"? new Date(row.endDay).toLocaleDateString("pt-PT"): row.endDay}</StyledTableCell>
*/}
                                <StyledTableCell align="left">
                                    <Row>
                                        <span style={{marginTop: '3.5%'}}>{row.status}</span>
                                        <IconButton color="success">
                                            <EditIcon fontSize={"small"}/>
                                        </IconButton>
                                    </Row>
                                </StyledTableCell>

                                <StyledTableCell align="left">
                                    <Row>
                                        <span style={{marginTop: '3.5%'}}>{row.allocatedTo}</span>
                                        <IconButton color="success">
                                            <EditIcon fontSize={"small"}/>
                                        </IconButton>
                                    </Row>
                                </StyledTableCell>
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
                                        style={{backgroundColor: 'rgba(20,143,119,.7)', color: '#F7F9F9',  textTransform: 'none', marginRight: '1%'}}

                                    />

                                    <Tab value="two" label="Em Progresso"
                                         style={{backgroundColor: '#45B39D', color: '#F7F9F9', textTransform: 'none',marginRight: '1%'}} />
                                    <Tab value="three" label="Em Revisão"
                                         style={{backgroundColor: '#17A589',color: '#F7F9F9', textTransform: 'none', marginRight: '1%'}}/>
                                    <Tab value="four" label="Concluídas"
                                         style={{backgroundColor: '#148F77',color: '#F7F9F9', textTransform: 'none', marginRight: '1%'}}/>
                                </Tabs>
                            </Box>

                            <TabPanel value="one">
                                <Box>
                                    <Box sx={{marginTop: '1%', marginRight:'2%' }}>
                                        <Row>
                                            {(!isAddingFile && !isUploadingFile) &&
                                                <Box>
                                                    <Tooltip
                                                        title={"Carregar arquivo de actividades (.xls)"}
                                                    >
                                                        <IconButton aria-label="fingerprint" color="success"
                                                                    onClick={() => setIsUploadingFile(true)}>
                                                            <CloudUploadIcon fontSize={"large"}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={"Adicionar actividade"} onClick={()=>setIsAddingFile(true)}>
                                                        <IconButton aria-label="fingerprint" color="success">
                                                            <AddCircleIcon fontSize={"large"}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            }

                                            {(isUploadingFile || isAddingFile) &&
                                                <Tooltip
                                                title={"Fechar"}
                                            >
                                                <IconButton aria-label="fingerprint" color="warning"
                                                            onClick={() => closeActivitiesHandler()}>
                                                    <CloseIcon fontSize={"medium"}/>
                                                </IconButton>
                                            </Tooltip>}
                                        </Row>
                                    </Box>
                                    {isUploadingFile && <UploadActivities/>}
                                    {(!isUploadingFile && !isAddingFile) && <FindActivities data={dataTodo}/>}

                                </Box>

                            </TabPanel>
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
