import {UserAction, UserActionTypes} from "../actionTypes/user.actionTypes";
import {IUser} from "../../models/user";

export interface IUserState {
    users: IUser[],
    userId: number,
    isLoading: boolean,
    errorMessage: string,
    userCreated: boolean,
    userArchived: boolean,

}

const initialState: IUserState = {
    isLoading: false,
    errorMessage: "",
    users: [] as IUser[],
    userId: 0,
    userArchived: false,
    userCreated: false
}

const userReducer = (state: IUserState = initialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.USER_LOADING:
            return {...state, isLoading: true}
        case UserActionTypes.USER_LOADING_SUCCESS:
            return {...state, isLoading: false, users: action.payload}
        case UserActionTypes.USER_LOADING_FAIL:
            return {...state, isLoading: false}

        case UserActionTypes.ADD_USER_LOADING:
            return {...state, isLoading: true, userCreated: false, userArchived: false}
        case UserActionTypes.ADD_USER_LOADING_SUCCESS:
            return {...state, isLoading: false, userCreated: true}
        case UserActionTypes.ADD_USER_LOADING_FAIL:
            return {...state, isLoading: false}

        case UserActionTypes.ARCHIVE_USER:
            return {...state, isLoading: true, userCreated: false, userArchived: false}
        case UserActionTypes.ARCHIVE_USER_SUCCESS:
            return {...state, isLoading: false, userArchived: true}
        case UserActionTypes.ARCHIVE_USER_FAIL:
            return {...state, isLoading: false}

        case UserActionTypes.SET_USER_LOADING_SUCCESS:
            return {...state, userId: action.payload }

        case UserActionTypes.RESET_STATUS:
            return {...state, userCreated: false, userArchived: false}
        default:
            return state;
    }
}

export default userReducer;
