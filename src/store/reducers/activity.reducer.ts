import {IActivity, IGanttActivity} from "../../models/activity";
import {ActivityAction, ActivityActionTypes} from "../actionTypes/activityTypes";
import {ISumActivities} from "../../models/ISumActivities";

export interface IActivityState {
    activities: IActivity[],
    gantActivities: IGanttActivity
    isLoading: boolean,
    errorMessage: string,
    countActivities: ISumActivities[];
}

const initialState: IActivityState = {
    isLoading: false,
    errorMessage: "",
    activities: [] as IActivity[],
    gantActivities: {} as IGanttActivity,
    countActivities: [] as ISumActivities[]

}

const activityReducer = (state: IActivityState = initialState, action: ActivityAction) => {
    switch (action.type) {
        case ActivityActionTypes.ACTIVITY_LOADING:
            return {...state, isLoading: true}
        case ActivityActionTypes.ACTIVITY_LOADING_SUCCESS:
            return {...state, isLoading: false, activities: action.payload}
        case ActivityActionTypes.ACTIVITY_LOADING_FAIL:
            return {...state, isLoading: false}
        case ActivityActionTypes.ACTIVITY_STATUS:
            return {...state, isLoading: true}
        case ActivityActionTypes.ACTIVITY_STATUS_SUCCESS:
            return {...state, isLoading: false}
        case ActivityActionTypes.ACTIVITY_STATUS_FAIL:
            return {...state, isLoading: false}
        case ActivityActionTypes.ACTIVITY_ALLOCATE:
            return {...state, isLoading: true}
        case ActivityActionTypes.ACTIVITY_ALLOCATE_SUCCESS:
            return {...state, isLoading: false}
        case ActivityActionTypes.ACTIVITY_ALLOCATE_FAIL:
            return {...state, isLoading: false}
        case ActivityActionTypes.ACTIVITY_GANTT:
            return {...state, isLoading: true}
        case ActivityActionTypes.ACTIVITY_GANTT_SUCCESS:
            return {...state, isLoading: false, gantActivities: action.payload}
        case ActivityActionTypes.ACTIVITY_GANTT_FAIL:
            return {...state, isLoading: false}
        case ActivityActionTypes.UPLOAD_ACTIVITIES:
            return {...state, isLoading: true}
        case ActivityActionTypes.UPLOAD_ACTIVITIES_SUCCESS:
            return {...state, isLoading: false}
        case ActivityActionTypes.UPLOAD_ACTIVITIES_FAIL:
            return {...state, isLoading: false}
        case ActivityActionTypes.LOAD_SUM_ACTIVITIES:
            return {...state, isLoading: true}
        case ActivityActionTypes.LOAD_SUM_ACTIVITIES_SUCCESS:
            return {...state, isLoading: false, countActivities: action.payload}
        case ActivityActionTypes.LOAD_SUM_ACTIVITIES_FAIL:
            return {...state, isLoading: false}
        default:
            return state;
    }
}

export default activityReducer;
