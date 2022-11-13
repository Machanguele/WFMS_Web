import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {UserAction, UserActionTypes} from "../actionTypes/user.actionTypes";
import {IUser} from "../../models/user";

import swal from "sweetalert";
import {color} from "chart.js/helpers";

export const userAction = () =>
    async (dispatch: Dispatch<UserAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: UserActionTypes.USER_LOADING
        });

        await api.get<IUser[]>("Users", {})
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: UserActionTypes.USER_LOADING_SUCCESS,
                        payload: response.data
                    });
                }
            })
            .catch(e => {
               dispatch({
                   type: UserActionTypes.USER_LOADING_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: UserActionTypes.USER_LOADING_FAIL,
            payload: e
        })
    }
    }

export const archiveUserAction = (email: string) =>
    async (dispatch: Dispatch<UserAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: UserActionTypes.ARCHIVE_USER
            });

            await api.put<IUser>("Users/archive", {email})
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: UserActionTypes.ARCHIVE_USER_SUCCESS,
                            payload: response.data
                        });
                        /*setTimeout(()=>{
                            swal("Bom trabalho!", "Utilizador arquivado com sucesso!", "success");
                        }, 2000)*/

                    }
                })
                .catch(e => {
                    dispatch({
                        type: UserActionTypes.ARCHIVE_USER_FAIL,
                        payload: e
                    })

                    swal("Falhou!", "Nao foi possivel arquivar o utilizador!", "error");
                });
        }catch (e: any) {
            dispatch({
                type: UserActionTypes.ARCHIVE_USER_FAIL,
                payload: e
            })
            swal("Falhou!", "Nao foi possivel arquivar o utilizador!", "error");
        }
    }


export const addUserAction = (email: string, fullName: string,
                                   role: string, department: string ) => {
    return async (dispatch: Dispatch<UserAction>) => {
        let api = new Api();

        try {
            dispatch({
                type: UserActionTypes.ADD_USER_LOADING
            });

            await api.post<IUser[]>("Users", {
                email, fullName, role, department
            })
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: UserActionTypes.ADD_USER_LOADING_SUCCESS,
                            payload: response.data
                        });
                        /*swal("Bom trabalho!", "Utilizador criado com sucesso!", "success");*/
                    }
                })
                .catch(e => {
                    dispatch({
                        type: UserActionTypes.ADD_USER_LOADING_FAIL,
                        payload: e
                    })
                    swal("Falhou!", "Nao foi possivel criar o utilizador!", "error");
                });
        } catch (e: any) {
            dispatch({
                type: UserActionTypes.ADD_USER_LOADING_FAIL,
                payload: e
            })
            swal("Falhou!", "Nao foi possivel criar o utilizador!", "error");
        }
    };
}

export const setSelectedUserAction = (data: number) =>
    async (dispatch: Dispatch<UserAction>) => {
            dispatch({
                            type: UserActionTypes.SET_USER_LOADING_SUCCESS,
                            payload: data
                        });

    }

export const resetStatusAction = (data: string) =>
    async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionTypes.RESET_STATUS,
            payload: data
        });

    }

