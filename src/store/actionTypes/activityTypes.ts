import {IError} from "../../models/error";
import {IActivity, IGanttActivity} from "../../models/activity";

export enum ActivityActionTypes {
    ACTIVITY_LOADING = "ACTIVITY_LOADING",
    ACTIVITY_LOADING_SUCCESS = "ACTIVITY_LOADING_SUCCESS",
    ACTIVITY_LOADING_FAIL = "ACTIVITY_LOADING_FAIL",
    ACTIVITY_STATUS = "ACTIVITY_STATUS",
    ACTIVITY_STATUS_SUCCESS = "ACTIVITY_STATUS_SUCCESS",
    ACTIVITY_STATUS_FAIL = "ACTIVITY_STATUS_FAIL",
    ACTIVITY_ALLOCATE = "ACTIVITY_ALLOCATE",
    ACTIVITY_ALLOCATE_SUCCESS = "ACTIVITY_ALLOCATE_SUCCESS",
    ACTIVITY_ALLOCATE_FAIL = "ACTIVITY_ALLOCATE_FAIL",
    ACTIVITY_GANTT = "ACTIVITY_GANTT",
    ACTIVITY_GANTT_SUCCESS = "ACTIVITY_GANTT_SUCCESS",
    ACTIVITY_GANTT_FAIL = "ACTIVITY_GANTT_FAIL",
    UPLOAD_ACTIVITIES = "UPLOAD_ACTIVITIES",
    UPLOAD_ACTIVITIES_SUCCESS = "UPLOAD_ACTIVITIES_SUCCESS",
    UPLOAD_ACTIVITIES_FAIL = "UPLOAD_ACTIVITIES_FAIL"

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

interface IActivitygGanttLoading {
    type: ActivityActionTypes.ACTIVITY_GANTT
}

interface IActivityGanttSuccess {
    type: ActivityActionTypes.ACTIVITY_GANTT_SUCCESS,
    payload: IGanttActivity
}

interface IActivityGanttFail {
    type: ActivityActionTypes.ACTIVITY_GANTT_FAIL,
    payload: {error: IError}
}

interface IUploadActivities {
    type: ActivityActionTypes.UPLOAD_ACTIVITIES
}

interface IUploadActivitiesSuccess {
    type: ActivityActionTypes.UPLOAD_ACTIVITIES_SUCCESS,
    payload: string
}

interface IUploadActivitiesFail {
    type: ActivityActionTypes.UPLOAD_ACTIVITIES_FAIL,
    payload: {error: IError}
}



export type ActivityAction =
    IActivityLoading | IActivityFail | IActivitySuccess | IActivitySatusLoading |
    IActivitySatusSuccess |IActivitySatusFail | IActivityAllocateLoading | IActivityAllocateSuccess|
    IActivityAllocateFail| IActivitygGanttLoading | IActivityGanttSuccess| IActivityGanttFail|
    IUploadActivities| IUploadActivitiesSuccess| IUploadActivitiesFail