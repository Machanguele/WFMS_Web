import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {ActivityAction, ActivityActionTypes} from "../actionTypes/activityTypes";
import {IActivity, IGanttActivity} from "../../models/activity";

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
