import {IActivity} from "../../models/activity";
import {ActivityAction, ActivityActionTypes} from "../actionTypes/activityTypes";

export interface IActivityState {
    activities: IActivity[],
    isLoading: boolean,
    errorMessage: string
}

const initialState: IActivityState = {
    isLoading: false,
    errorMessage: "",
    activities: [] as IActivity[]
}

const activityReducer = (state: IActivityState = initialState, action: ActivityAction) => {
    switch (action.type) {
        case ActivityActionTypes.ACTIVITY_LOADING:
            return {...state, isLoading: true}
        case ActivityActionTypes.ACTIVITY_LOADING_SUCCESS:
            return {...state, isLoading: false, activities: action.payload}
        case ActivityActionTypes.ACTIVITY_LOADING_FAIL:
            return {...state, isLoading: false}
        default:
            return state;
    }
}

export default activityReducer;
