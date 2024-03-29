import React, {useState} from "react";

import '@progress/kendo-theme-default/dist/all.css';
import {useTypeSelector} from "../hooks/useTypeSelector";
import {IUser} from "../models/user";
import {useDispatch} from "react-redux";
import {
    addUserAction,
    archiveUserAction,
    resetStatusAction,
    userAction
} from "../store/actionCreators/user.actionCreator";
import {Block} from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Row} from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import {Button, FormGroup, FormText, Input, Label} from "reactstrap";
import Dialog from "@mui/material/Dialog";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

import {
    AutoComplete,
    ComboBox,
    MultiColumnComboBox,
    DropDownList,
    MultiSelect,
    DropDownTree,
} from "@progress/kendo-react-dropdowns";
import { Checkbox } from "@progress/kendo-react-inputs";
import {Alert, CircularProgress, List} from "@mui/material";
import Stack from "@mui/material/Stack";

const roles =[
    "Gestor de actividades ",
    "Operador Transacional",
    "Director",
    "TI de Suporte"
]

const departments =[
    "DEEL",
    "DRA",
    "DECI",
    "DEMA",
    "DEQUI",
    "DCG"
]


const cardStyles = {
    detailsButton: {
        borderRadius: 5,
        marginLeft: '45%',
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
        // borderLeft: '5px solid #F39C12',
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
        marginTop: '2.5%'
    }
}

function UsersComponent() {

    const [data, setData] = React.useState<IUser[]>([]);
    const {users, isLoading, userArchived, userCreated} = useTypeSelector(
        (state) => state.user
    );
    const [selectedUser, setSelectedUser] = React.useState<IUser>();

    const [addUser, setAddUser] = useState(false);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [errorValidation, setErrorValidation] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);


    const dispatch = useDispatch();

    const userHandler = () => {
        dispatch(resetStatusAction("reset"))
        dispatch(userAction());

    };

    const archiveUserHandler =(email: string)=>{
        dispatch(archiveUserAction(email))
        setTimeout(()=>{
            //userHandler();
            dispatch(resetStatusAction("reset"))
            userHandler()
        }, 2000)

    }

    const createUserHandler = ()=>{
        if(email == '' || fullName =='' || role ==''|| department == ''){
            setErrorValidation(true)
            setTimeout(()=>{
                setErrorValidation(false)
            }, 2000)
        }
        else{
            dispatch(addUserAction(email, fullName, role, department))
            setIsLoadingUsers(true)
            setTimeout(()=>{
                setIsLoadingUsers(false)
                dispatch(resetStatusAction("reset"))
                userHandler();
            }, 1000)
            setTimeout(()=>{
                setAddUser(false)
            }, 1000)
        }

    }

    React.useEffect(() => {
        //let newItems = getItems();
        userHandler();
        setData(users);
        setIsLoadingUsers(true)
        setTimeout(()=>{
            setIsLoadingUsers(false)
        }, 1000)

    }, []);



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

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    return (
           <>
               {(isLoadingUsers || isLoading) &&
                   <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
                       <CircularProgress color="success" size={50} />
                   </Box>}

               {userCreated && <Stack sx={{width: '100%'}} spacing={2}>
                   <Alert severity="success">Utilizador criado com sucesso</Alert>
               </Stack>}

               {userArchived && <Stack sx={{width: '100%'}} spacing={2}>
                   <Alert severity="success">Utilizador arquivado com sucesso</Alert>
               </Stack>}

                   {!(isLoadingUsers || isLoading) &&
                   <Box>
                       <Box sx={{marginLeft:'-2%'}}>
                           {!addUser &&
                               <Button color="success" link onClick={() => {setAddUser(true)}}
                                       style={{borderRadius: 3}}
                               >
                                   <span style={{color: '#FFFFFF'}}>Adicionar Utilizador</span>
                               </Button>
                           }


                       </Box>
                       {
                           !addUser &&
                           <Paper style={{maxHeight: 500, overflow: 'auto'}}>
                               <List>
                                   <TableContainer component={Paper} sx={{marginLeft: '0%'}}>
                                       <Table sx={{ minWidth: 650, marginLeft: 0, width: '100%' }} aria-label="simple table">
                                           <TableHead>
                                               <TableRow>
                                                   <TableCell>#</TableCell>
                                                   <TableCell sx={{width: '8%'}}>Nome</TableCell>
                                                   <TableCell align="left" sx={{width: '12%'}}>Email</TableCell>
                                                   <TableCell align="left">Função</TableCell>
                                                   <TableCell align="left">Departamento</TableCell>
                                                   <TableCell align="left">Arquivado</TableCell>
                                                   <TableCell align="left">Acção</TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {data.map((row, index) => (
                                                   <StyledTableRow
                                                       key={index+1}
                                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                   >
                                                       <TableCell component="th" scope="row">
                                                           {index+1}
                                                       </TableCell>
                                                       <TableCell component="th" scope="row" sx={{width: '18%'}}>
                                                           {row.fullName}
                                                       </TableCell>
                                                       <TableCell align="left" sx={{width: '10%'}}>{row.email}</TableCell>

                                                       <TableCell align="left">{row.role}</TableCell>

                                                       <TableCell align="left">
                                                           {row.department}
                                                       </TableCell>
                                                       <TableCell align="left">
                                                           <Checkbox
                                                               defaultValue={row.archived}
                                                               onClick={()=>archiveUserHandler(row.email)}
                                                           />
                                                       </TableCell>

                                                       <TableCell align="left">
                                                           <Row>
                                                               <IconButton color="success">
                                                                   <EditIcon fontSize={"small"}/>
                                                               </IconButton>
                                                           </Row>
                                                       </TableCell>
                                                   </StyledTableRow>
                                               ))}
                                           </TableBody>
                                       </Table>
                                   </TableContainer>
                               </List>
                           </Paper>
                       }

                       {addUser
                           &&
                           <Box sx={{backgroundColor: '#FFFFFF', width: '100%', margin: 'auto', marginTop: '1%', borderRadius: 4, borderLeftWidth: 8,
                               borderLeft: '3px solid #167415', borderRight: '3px solid #167415', paddingTop: '2%'}}>
                               <Box sx={{width: '95%', marginLeft: '2%'}}>
                                   {errorValidation && <Stack sx={{width: '100%'}} spacing={2}>
                                       <Alert severity="warning">Deve preencher todos os campos</Alert>
                                   </Stack>}
                                   <form>
                                       <FormGroup>
                                           <Label for="exampleEmail" style={cardStyles.inputLabels} >Nome do Utilizador</Label>
                                           <Input
                                               style={cardStyles.inputStyles}
                                               type="text"
                                               name="text"
                                               id="exampleEmail"
                                               placeholder=''
                                               required
                                               value={fullName}
                                               onChange={(value)=>setFullName(value.target.value)}
                                           />
                                       </FormGroup>

                                       <FormGroup>
                                           <Label for="exampleText" style={cardStyles.inputLabels}>Email</Label>
                                           <Input type="text" name="text" id="exampleText"
                                                  style={cardStyles.inputStyles}
                                                  value={email}
                                                  required
                                                  onChange={(value)=>setEmail(value.target.value)}
                                           />

                                       </FormGroup>

                                       <Row>
                                           <Box sx={{marginLeft: '1%'}}>
                                               <FormGroup>
                                                   <Label for="exampleText" style={cardStyles.inputLabels}>Função</Label>
                                                   <Box>
                                                       <ComboBox
                                                           style={{
                                                               width: "300px",
                                                           }}
                                                           data={roles}
                                                           defaultValue={role}
                                                           required
                                                           onChange={handleChangeRole}
                                                       />
                                                   </Box>
                                               </FormGroup>
                                           </Box>

                                           <Box sx={{marginLeft: '10%'}}>
                                               <FormGroup>
                                                   <Label for="exampleText" style={cardStyles.inputLabels}>Departamento</Label>
                                                   <Box>
                                                       <ComboBox
                                                           style={{
                                                               width: "300px",
                                                           }}
                                                           data={departments}
                                                           defaultValue={department}
                                                           required
                                                           onChange={handleChangeDepartment}
                                                       />
                                                   </Box>
                                               </FormGroup>
                                           </Box>
                                       </Row>


                                       {
                                           addUser && <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}>
                                               <Row>
                                                   <IconButton color="warning" component="label">
                                                       <InfoIcon fontSize={"large"}/>
                                                   </IconButton>
                                                   <span style={cardStyles.infoLabels}>O utilizador criado irá receber a notificação de permissão de acesso por email</span>
                                               </Row>
                                           </Box>
                                       }

                                       <Box sx={{display: 'flex', justifyContent: 'center'}}>

                                           <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                               <IconButton color="warning" aria-label="upload picture" component="label" onClick={() => setAddUser(false)}>
                                                   <CloseIcon fontSize={"large"}/>
                                               </IconButton>
                                           </Box>

                                           <Button
                                               style={{borderRadius: 5}}
                                               color="success" link onClick={createUserHandler}>
                                               Gravar
                                           </Button>

                                       </Box>
                                   </form>
                               </Box>
                           </Box>
                       }


                   </Box>
               }

           </>
    );
}

export default UsersComponent;
