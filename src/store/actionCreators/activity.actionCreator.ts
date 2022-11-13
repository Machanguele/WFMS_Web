import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {ActivityAction, ActivityActionTypes} from "../actionTypes/activityTypes";
import {IActivity, IGanttActivity} from "../../models/activity";
import axios from "axios";
import {ISumActivities} from "../../models/ISumActivities";

export const activityAction = (componentId: number) =>
    async (dispatch: Dispatch<ActivityAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: ActivityActionTypes.ACTIVITY_LOADING
        });

        await api.get<IActivity[]>(`activities/${componentId}`, {})
            .then(response => {

                console.log("dados de retorno")
                console.log(response.data)

                if (response.status === 200) {
                    dispatch({
                        type: ActivityActionTypes.ACTIVITY_LOADING_SUCCESS,
                        payload: response.data
                    });
                }
            })
            .catch(e => {
               dispatch({
                   type: ActivityActionTypes.ACTIVITY_LOADING_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: ActivityActionTypes.ACTIVITY_LOADING_FAIL,
            payload: e
        })
    }
    }


export const activitySumAction = () =>
    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_LOADING
            });

            await api.get<ISumActivities[]>(`activities/count`, {})
                .then(response => {

                    console.log("dados de retorno")
                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.LOAD_SUM_ACTIVITIES_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.LOAD_SUM_ACTIVITIES_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.LOAD_SUM_ACTIVITIES_FAIL,
                payload: e
            })
        }
    }

export const createActivityAction = (name: string, description: string, componentId: number, expectedStarAt: string,
                                     expectedEndAt: string

) =>
    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ActivityActionTypes.CREATE_ACTIVITY
            });

            await api.post<IActivity>(`activities`, {
                name,
                description,
                componentId,
                expectedEndAt,
                expectedStarAt
            })
                .then(response => {

                    console.log("dados de retorno")
                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.CREATE_ACTIVITY_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.CREATE_ACTIVITY_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.CREATE_ACTIVITY_FAIL,
                payload: e
            })
        }
    }

export const uploadActivityAction = (data: FormData) =>


    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();
        console.log("dados enviados", data)

        try {
            dispatch({
                type: ActivityActionTypes.UPLOAD_ACTIVITIES
            });
            axios({
                method: "post",
                url: "https://localhost:5001/api/Activities/loudFile",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.UPLOAD_ACTIVITIES_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e=> {
                    //handle error
                    dispatch({
                        type: ActivityActionTypes.UPLOAD_ACTIVITIES_FAIL,
                        payload: e
                    })
                    console.log(e);
                });


            /*await api.post<string>(`activities/loudFile`, data)

                .then(response => {

                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.UPLOAD_ACTIVITIES_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.UPLOAD_ACTIVITIES_FAIL,
                        payload: e
                    })
                });*/
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.UPLOAD_ACTIVITIES_FAIL,
                payload: e
            })
        }
    }


export const activityGanttAction = (componentId: number) =>
    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_GANTT
            });

            await api.get<IGanttActivity>(`activities/gantt/${componentId}`, {})
                .then(response => {

                    console.log("dados de retorno")
                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.ACTIVITY_GANTT_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.ACTIVITY_GANTT_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_GANTT_FAIL,
                payload: e
            })
        }
    }



















export const activityStatusAction = (activityStatus: string, activityId: number) =>
    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_STATUS
            });

            await api.put<IActivity[]>(`activities/status`, {activityStatus, activityId})
                .then(response => {

                    console.log("dados de Estados")
                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.ACTIVITY_STATUS_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.ACTIVITY_STATUS_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_STATUS_FAIL,
                payload: e
            })
        }
    }


export const allocateUserAction = (userEmail: string, activityId: number) =>
    async (dispatch: Dispatch<ActivityAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_ALLOCATE
            });

            await api.put<IActivity[]>(`activities/allocate`, {userEmail, activityId})
                .then(response => {

                    console.log("dados de Estados")
                    console.log(response.data)

                    if (response.status === 200) {
                        dispatch({
                            type: ActivityActionTypes.ACTIVITY_ALLOCATE_SUCCESS,
                            payload: response.data
                        });
                    }
                })
                .catch(e => {
                    dispatch({
                        type: ActivityActionTypes.ACTIVITY_ALLOCATE_FAIL,
                        payload: e
                    })
                });
        }catch (e: any) {
            dispatch({
                type: ActivityActionTypes.ACTIVITY_ALLOCATE_FAIL,
                payload: e
            })
        }
    }
