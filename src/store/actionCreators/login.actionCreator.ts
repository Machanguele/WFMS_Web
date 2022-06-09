import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {LoginAction, LoginActionTypes} from "../actionTypes/login.actionTypes";
import {ILogin} from "../../models/login";

export const loginAction = (email: string, password: string) =>
    async (dispatch: Dispatch<LoginAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: LoginActionTypes.LOGIN_LOADING
        });

        await api.post<ILogin>("/auth", {email, password})
            .then(r => {

                console.log("dados de retorno")
                console.log(r.data)

                if (r.status === 200) {
                    localStorage.setItem('user', JSON.stringify(r.data));
                    console.log("teste");
                    console.log(localStorage.getItem('user'));
                    dispatch({
                        type: LoginActionTypes.LOGIN_SUCCESS,
                        payload: r.data
                    });
                }
            })
            .catch(e => {
               dispatch({
                   type: LoginActionTypes.LOGIN_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: LoginActionTypes.LOGIN_FAIL,
            payload: e
        })
    }
    }

    export const recoverAction = (email: string) =>
    async (dispatch: Dispatch<LoginAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: LoginActionTypes.LOGIN_LOADING
        });

        await api.post<ILogin>("/auth", {email})
            .then(r => {

                console.log("dados de retorno")
                console.log(r.data)

                if (r.status === 200) {
                    dispatch({
                        type: LoginActionTypes.LOGIN_SUCCESS,
                        payload: r.data
                    })
                }
            })
            .catch(e => {
               dispatch({
                   type: LoginActionTypes.LOGIN_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: LoginActionTypes.LOGIN_FAIL,
            payload: e
        })
    }
}


export const logoutAction = () =>
    async (dispatch: Dispatch<LoginAction>) => {
        //let api = new Api();

        try {
            dispatch({
                type: LoginActionTypes.LOGOUT_LOADING
            });

            localStorage.clear();
            dispatch({
                type: LoginActionTypes.LOGOUT_SUCCESS
            });

        }catch (e: any) {
            dispatch({
                type: LoginActionTypes.LOGOUT_FAIL,
                payload: e
            })
        }
    }
