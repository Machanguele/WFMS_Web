import React from "react";
import Board from 'react-trello'


export  function Kanban() {




    const CustomCard = props => {
        return (
            <div>
                <header
                    style={{borderBottom: '1px solid #eee', paddingBottom: 6, marginBottom: 8,
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        color: props.cardColor
                    }}
                >
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.name}</div>
                    <div style={{ fontSize: 11 }}>{props.dueOn}</div>
                </header>
                <div style={{ fontSize: 12, color: '#BD3B36' }}>
                    <div style={{ color: '#4C4C4C', fontWeight: 'bold' }}>{props.subTitle}</div>
                    <div style={{ padding: '5px 0px' }}><i>{props.body}</i></div>
                    <div style={{ marginTop: 8, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold' }}>
                        {props.escalationText}
                    </div>
                </div>
            </div>
        )
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

    return (
        <div className="content content-center">
            <Board
                customLayout={ true}
                data={data}
                draggable ={true}
                editable ={true}
                style={{ background: 'transparent', color: 'green' }}
            />
            <CustomCard />
        </div>

    );
}