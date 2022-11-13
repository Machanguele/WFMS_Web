import {ILogin} from "../../models/login";
import {LoginAction, LoginActionTypes} from "../actionTypes/login.actionTypes";

export interface ILoginState {
    loginData: ILogin,
    isLoading: boolean,
    errorMessage: string,
    userLogged: string
}

const initialState: ILoginState = {
    isLoading: false,
    errorMessage: "",
    userLogged: '',
    loginData: {} as ILogin
}

const loginReducer = (state: ILoginState = initialState, action: LoginAction) => {
    switch (action.type) {
        case LoginActionTypes.LOGIN_LOADING:
            return {...state, isLoading: true}
        case LoginActionTypes.LOGIN_SUCCESS:
            return {...state, isLoading: false, login: action.payload, userLogged: action.payload?.fullName}
        case LoginActionTypes.LOGIN_FAIL:
            return {...state, isLoading: false, errorMessage: action.payload}
        case LoginActionTypes.LOGOUT_LOADING:
            return {...state, isLoading: true}
        case LoginActionTypes.LOGOUT_SUCCESS:
            return {...state, isLoading: false, login: {}, userLogged: ''}
        case LoginActionTypes.LOGOUT_FAIL:
            return {...state, isLoading: false, errorMessage: action.payload}
        default:
            return state;
    }
}

export default loginReducer;
