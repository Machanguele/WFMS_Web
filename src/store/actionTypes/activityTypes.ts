import {IError} from "../../models/error";
import {IActivity} from "../../models/activity";
import {IActivityStatus} from "../../models/activityStatus";

export enum ActivityActionTypes {
    ACTIVITY_LOADING = "ACTIVITY_LOADING",
    ACTIVITY_LOADING_SUCCESS = "ACTIVITY_LOADING_SUCCESS",
    ACTIVITY_LOADING_FAIL = "ACTIVITY_LOADING_FAIL",
    ACTIVITY_STATUS = "ACTIVITY_STATUS",
    ACTIVITY_STATUS_SUCCESS = "ACTIVITY_STATUS_SUCCESS",
    ACTIVITY_STATUS_FAIL = "ACTIVITY_STATUS_FAIL",
    ACTIVITY_ALLOCATE = "ACTIVITY_ALLOCATE",
    ACTIVITY_ALLOCATE_SUCCESS = "ACTIVITY_ALLOCATE_SUCCESS",
    ACTIVITY_ALLOCATE_FAIL = "ACTIVITY_ALLOCATE_FAIL"
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

interface IActivitySatusLoading {
    type: ActivityActionTypes.ACTIVITY_STATUS
}

interface IActivitySatusSuccess {
    type: ActivityActionTypes.ACTIVITY_STATUS_SUCCESS,
    payload: IActivity[]
}

interface IActivitySatusFail {
    type: ActivityActionTypes.ACTIVITY_STATUS_FAIL,
    payload: {error: IError}
}

interface IActivityAllocateLoading {
    type: ActivityActionTypes.ACTIVITY_ALLOCATE
}

interface IActivityAllocateSuccess {
    type: ActivityActionTypes.ACTIVITY_ALLOCATE_SUCCESS,
    payload: IActivity[]
}

interface IActivityAllocateFail {
    type: ActivityActionTypes.ACTIVITY_ALLOCATE_FAIL,
    payload: {error: IError}
}


export type ActivityAction =
    IActivityLoading | IActivityFail | IActivitySuccess | IActivitySatusLoading |
    IActivitySatusSuccess |IActivitySatusFail | IActivityAllocateLoading | IActivityAllocateSuccess| IActivityAllocateFail