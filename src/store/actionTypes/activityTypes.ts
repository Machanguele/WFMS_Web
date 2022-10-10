import {IError} from "../../models/error";
import {IActivity} from "../../models/activity";

export enum ActivityActionTypes {
    ACTIVITY_LOADING = "ACTIVITY_LOADING",
    ACTIVITY_LOADING_SUCCESS = "ACTIVITY_LOADING_SUCCESS",
    ACTIVITY_LOADING_FAIL = "ACTIVITY_LOADING_FAIL",
}

interface IActivityLoading {
    type: ActivityActionTypes.ACTIVITY_LOADING
}

interface IActivitySuccess {
    type: ActivityActionTypes.ACTIVITY_LOADING_SUCCESS,
    payload: IActivity[]
}

interface IActivityFail {
    type: ActivityActionTypes.ACTIVITY_LOADING_FAIL,
    payload: {error: IError}
}


export type ActivityAction =
    IActivityLoading | IActivityFail | IActivitySuccess