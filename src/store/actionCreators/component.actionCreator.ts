import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {ComponentAction, ComponentActionTypes} from "../actionTypes/component.actionTypes";
import {IComponent} from "../../models/component";
import {IActivity, IGanttActivity} from "../../models/activity";

export const componentAction = (email: string, role: string) =>
    async (dispatch: Dispatch<ComponentAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: ComponentActionTypes.COMPONENT_LOADING
        });

        await api.get<IComponent[]>("Components", {email, role})
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: ComponentActionTypes.COMPONENT_LOADING_SUCCESS,
                        payload: response.data
                    });
                }
            })
            .catch(e => {
               dispatch({
                   type: ComponentActionTypes.COMPONENT_LOADING_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: ComponentActionTypes.COMPONENT_LOADING_FAIL,
            payload: e
        })
    }
    }


export const closeComponentAction = (componentId: number) =>
    async (dispatch: Dispatch<ComponentAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ComponentActionTypes.CLOSE_COMPONENT
            });

            await api.put<IComponent>("Components/finish", {componentId})
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: ComponentActionTypes.CLOSE_COMPONENT_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ComponentActionTypes.CLOSE_COMPONENT_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ComponentActionTypes.CLOSE_COMPONENT_FAIL,
                payload: e
            })
        }
    }


export const ganttomponentsAction = () =>
    async (dispatch: Dispatch<ComponentAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ComponentActionTypes.COMPONENT_GANTT_LOADING
            });

            await api.get<IGanttActivity[]>("Components/gantt", {})
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: ComponentActionTypes.COMPONENT_GANTT_LOADING_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ComponentActionTypes.COMPONENT_GANTT_LOADING_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ComponentActionTypes.COMPONENT_GANTT_LOADING_FAIL,
                payload: e
            })
        }
    }

export const addComponentAction = (title: string, departmentId: number,
                                   description: string,expectedStartDate: string,
                                   expectedEndDate: string) =>
    async (dispatch: Dispatch<ComponentAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ComponentActionTypes.ADD_COMPONENT_LOADING
            });

            await api.post<IComponent[]>("Components", {title, departmentId,
                description, expectedStartDate, expectedEndDate })
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: ComponentActionTypes.ADD_COMPONENT_LOADING_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ComponentActionTypes.ADD_COMPONENT_LOADING_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ComponentActionTypes.ADD_COMPONENT_LOADING_FAIL,
                payload: e
            })
        }
    }

export const setSelectedComponentAction = (data: number) =>
    async (dispatch: Dispatch<ComponentAction>) => {
            dispatch({
                            type: ComponentActionTypes.SET_COMPONENT_LOADING_SUCCESS,
                            payload: data
                        });

    }

