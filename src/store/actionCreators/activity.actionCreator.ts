import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {ActivityAction, ActivityActionTypes} from "../actionTypes/activityTypes";
import {IActivity} from "../../models/activity";

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
