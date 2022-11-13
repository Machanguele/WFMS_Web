// @flow
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Box from "@mui/material/Box";
import {Button, FormGroup, FormText, Input, Label} from "reactstrap";
import {useTypeSelector} from "../hooks/useTypeSelector";
import Stack from "@mui/material/Stack";
import {Alert, CircularProgress} from "@mui/material";
import {addUserAction, resetStatusAction} from "../store/actionCreators/user.actionCreator";
import {useDispatch} from "react-redux";
import {activityAction, createActivityAction} from "../store/actionCreators/activity.actionCreator";

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

export  function CreateActivity(){

   /* const {activities,isLoading, errorMessage, gantActivities} = useTypeSelector(
        (state) => state.activity
    );*/

    const {componentId } = useTypeSelector(
        (state) => state.component
    );
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expectedStarAt, setExpectedStarAt] = useState('2022-11-14');
    const [expectedEndAt, setExpectedEndAt] = useState('2022-11-30');
    const [errorValidation, setErrorValidation] = useState(false);

    const dispatch = useDispatch()
    useEffect(()=>{

    }, [])

    const createActivityHandler = ()=>{
        if(name == '' || description =='' || componentId == 0){
            setErrorValidation(true)
            setTimeout(()=>{
                setErrorValidation(false)
            }, 2000)
        }
        else{
            dispatch(createActivityAction(name, description, componentId, expectedStarAt, expectedEndAt))
            setTimeout(()=>{
                dispatch(activityAction(componentId))
            })
        }

    }





    return (
        <>
            <Box sx={{backgroundColor: '#FFFFFF', width: '100%', margin: 'auto', marginTop: '1%', borderRadius: 4, borderLeftWidth: 8,
                borderLeft: '3px solid #167415', borderRight: '3px solid #167415', paddingTop: '2%'}}>
                <Box sx={{width: '95%', marginLeft: '2%'}}>
                    {errorValidation && <Stack sx={{width: '100%'}} spacing={2}>
                        <Alert severity="warning">Deve preencher todos os campos</Alert>
                    </Stack>}
                    <form>
                        <FormGroup>
                            <Label for="exampleEmail" style={cardStyles.inputLabels} >Título</Label>
                            <Input
                                style={cardStyles.inputStyles}
                                type="text"
                                name="text"
                                id="exampleEmail"
                                placeholder=''
                                required
                                value={name}
                                onChange={(value)=>setName(value.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleText" style={cardStyles.inputLabels}>Descrição</Label>
                            <Input type="text" name="text" id="exampleText"
                                   style={cardStyles.inputStyles}
                                   value={description}
                                   required
                                   onChange={(value)=>setDescription(value.target.value)}
                            />
                        </FormGroup>

                        <Row>

                            <Box style={{marginLeft: '4%'}}>
                                <FormGroup>
                                    <Label for="exampleText" style={cardStyles.inputLabels}>Espectativa de início</Label>
                                    <Input type="date" name="text" id="exampleText"
                                           style={cardStyles.inputStyles}
                                    />
                                </FormGroup>

                            </Box>

                            <Box style={{marginLeft: '4%'}}>
                                <FormGroup>
                                    <Label for="exampleText" style={cardStyles.inputLabels}>Espectativa de fim</Label>
                                    <Input type="date" name="text" id="exampleText"
                                           style={cardStyles.inputStyles}
                                    />
                                </FormGroup>
                            </Box>
                        </Row>

                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                style={{borderRadius: 5}}
                                color="success" link onClick={()=>{createActivityHandler()}}>
                                Gravar
                            </Button>

                        </Box>
                    </form>
                </Box>
            </Box>
        </>



    );
};