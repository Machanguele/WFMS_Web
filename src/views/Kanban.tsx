import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";
import Board from 'react-trello'
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {activityAction, activityGanttAction} from "../store/actionCreators/activity.actionCreator";
import {IActivityHelper} from "../models/activity";
import {Button} from "reactstrap";
import {GanttComponentAct} from "../components/Gantt";
import ActivitiesTable from "../components/ActivitiesTable";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export  function Kanban() {

    const [dados, setDados] = useState<Ilanes>();
    const {activities,isLoading, errorMessage, gantActivities} = useTypeSelector(
        (state) => state.activity
    );
    const {componentId } = useTypeSelector(
        (state) => state.component
    );

    console.log("O gant: ", gantActivities)

    const dispatch = useDispatch();
    const history = useHistory();

    const activitiesHandler = () => {
        dispatch(activityAction(componentId));
    };
    const activitiesGanttHandler = () => {
        dispatch(activityGanttAction(componentId));
    };
    useEffect(()=>{
        if(componentId != 0){
            activitiesHandler()
            activitiesGanttHandler()
        }
    }, [0])

    useEffect(()=>{
        if(activities != null){
            setDados(correctData)
        }
    }, [activities])

    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const CustomCard = props => {
        return (
            <div>
                {/*<header
                    style={{borderBottom: '1px solid #eee', paddingBottom: 6, marginBottom: 8,
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        color: props.cardColor
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.name}</div>
                    <div style={{ fontSize: 11 }}>{props.dueOn}</div>
                </header>*/}
                <div style={{ fontSize: 12, color: '#BD3B36' }}>
                    <div style={{ color: '#4C4C4C', fontWeight: 'bold' }}>{props.subTitle}</div>
                    <div style={{ padding: '5px 0px' }}><i>{props.body}</i></div>
                    <div style={{ marginTop: 8, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold' }}>
                        {props.escalationText}
                    </div>
                    <p>Teste</p>
                    <Button className="primary">Assign</Button>
                </div>
                <div>
                    <Button color="success" link>
                        Alocar utilizador
                    </Button>
                </div>
            </div>
        )
    }

    interface IKanbanCardAdapter{
        id: string,
        title: string,
        label: string,
        description: string,
        draggable: boolean

    }
    interface IKanbanAdapter{
        id: string,
        title: string,
        label: string,
        cards: IKanbanCardAdapter[]
    }

    interface Ilanes{
        lanes: IKanbanAdapter[]
    }

    const correctData =()=>{
        let adapter: IKanbanAdapter[];
        let lanes : Ilanes;
        adapter =[];
        activities.map((item=>{
             adapter.push({
                 id: `${item?.status?.id}`,
                 label: `${item?.activities?.length}/${item.totalActivities}`,
                 title: item.status?.name,
                 cards: returnData(item?.activities)
             })
        }))
        lanes = {
            lanes: adapter
        };
        return lanes;
    }

    const returnData =(data: IActivityHelper[])=>{
        let  aux: IKanbanCardAdapter[];
        aux = [];
        data.map((item)=>{
            return aux.push({
                id: ""+item?.id,
                label: item.status?.name,
                title: item?.name,
                draggable: true,
                description: item?.description
            });
        })
        return aux;
    }

    const data = {
        lanes: [
            {
                id: 'lane1',
                title: 'Planeadas',
                label: '2/8',
                cards: [
                    {id: 'Card1',
                        title: 'Publicar Pautas',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                            ' when an unknown printer took a galley of type and scrambled it to make a' +
                            ' type specimen book.',
                        label: '30 mins',
                        draggable: true},
                ],

            },
            {
                id: 'lane2',
                title: 'Em execução',
                label: '2/8',
                cards: [
                    {id: 'Card1',
                        title: 'Exames Normais',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                            ' when an unknown printer took a galley of type and scrambled it to make a' +
                            ' type specimen book.',
                        label: '30 mins',
                        draggable: true},
                    {id: 'Card2',
                        title: 'Actualizacao SIGA',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        label: '30 mins',
                        draggable: true,
                        metadata: {sha: 'be312a1'}},

                    {id: 'Card3',
                        title: 'Recepcao Novos ingressos',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        label: '30 mins',
                        draggable: true,
                        metadata: {sha: 'be312a1'}}
                ],
            },

            {
                id: 'lane3',
                title: 'Em Revisão',
                label: '2/8',
                cards: [
                    {id: 'Card1',
                        title: 'Dia Aberto',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                            ' when an unknown printer took a galley of type and scrambled it to make a' +
                            ' type specimen book.',
                        label: '30 mins',
                        draggable: true},
                    {id: 'Card2',
                        title: 'Graduacao',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
                        label: '30 mins',
                        draggable: true,
                        metadata: {sha: 'be312a1'}}
                ],
            },



            {
                id: 'lane4',
                title: 'Completas',
                label: '2/8',
                cards: [
                    {id: 'Card1',
                        title: 'Notas',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                            ' when an unknown printer took a galley of type and scrambled it to make a' +
                            ' type specimen book.',
                        label: '30 mins',
                        draggable: true},

                ],
            }
        ]
    }

    const components = {
        AddCardLink:      () => <button>New Card</button>,
        /*LaneHeader:       CustomLaneHeader,
        NewCardForm:      NewCard,
        NewLaneSection:   NewLane,*/
        Card:             CustomCard
    };

    return (
            <div className="content content-center">
                <Box>

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
                                    <Tab value="one" label="Quadro de actividades" style={{color: '#167415', textTransform: 'none'}} />
                                    <Tab
                                        value="two"
                                        label="Gestão de actividades "
                                        style={{color: '#167415',  textTransform: 'none', marginLeft: '1%', marginRight: '1%'}}

                                    />
                                    <Tab value="three" label="Diagrama de Gantt" style={{color: '#167415', textTransform: 'none'}}/>
                                </Tabs>
                            </Box>

                            <TabPanel value="one">
                                <Board
                                    customCardLayout={true}
                                    data={dados != null ? dados: data}
                                    draggable={false}
                                    editable={false}
                                    style={{ background: 'rgba(255, 255, 200, .1)', color: 'green', fontFamily: 'sans-serif', fontSize: '12pt' }}
                                >
                                    <CustomCard props={data}/>
                                </Board></TabPanel>

                            <TabPanel value="two">
                                    <ActivitiesTable/>
                            </TabPanel>
                            <TabPanel value="three"><GanttComponentAct/></TabPanel>
                        </TabContext>
                </Box>

               {/* <Board
                    addCardLink     ={<button>New Card</button>}
                    customLaneHeader={<p>Ola</p>}
                    newCardTemplate ={<p>Estamos aqui</p>}
                    newLaneTemplate ={<p>New Lane</p>}
                    customCardLayout
                >
                    <CustomCard />
                </Board>*/}
        </div>

    );
}