import {IError} from "../../models/error";
import {IUser} from "../../models/user";

export enum UserActionTypes {
    USER_LOADING = "USER_LOADING",
    USER_LOADING_SUCCESS = "USER_LOADING_SUCCESS",
    USER_LOADING_FAIL = "USER_LOADING_FAIL",
    ADD_USER_LOADING = "ADD_USER_LOADING",
    ADD_USER_LOADING_SUCCESS = "ADD_USER_LOADING_SUCCESS",
    ADD_USER_LOADING_FAIL = "USER_LOADING_FAIL",
    SET_USER_LOADING = "SET_USER_LOADING",
    SET_USER_LOADING_SUCCESS = "SET_USER_LOADING_SUCCESS",
    SET_USER_LOADING_FAIL = "SET_USER_LOADING_FAIL",
    ARCHIVE_USER = "ARCHIVE_USER",
    ARCHIVE_USER_SUCCESS = "ARCHIVE_USER_SUCCESS",
    ARCHIVE_USER_FAIL = "ARCHIVE_USER_FAIL",

    USER_CREATED = "USER_CREATED",
    USER_CREATED_SUCCESS = "USER_CREATED_SUCCESS",
    USER_CREATED_FAIL = "USER_CREATED_FAIL",

    USER_ARCHIVED = "USER_ARCHIVED",
    USER_ARCHIVED_SUCCESS = "USER_ARCHIVED_SUCCESS",
    USER_ARCHIVED_FAIL = "USER_ARCHIVED_FAIL",


    RESET_STATUS = "RESET_STATUS",

}

interface IUserLoading {
    type: UserActionTypes.USER_LOADING
}

interface IUserSuccess {
    type: UserActionTypes.USER_LOADING_SUCCESS,
    payload: IUser[]
}

interface IUserFail {
    type: UserActionTypes.USER_LOADING_FAIL,
    payload: {error: IError}
}

interface IAddUserLoading {
    type: UserActionTypes.ADD_USER_LOADING
}

interface IAddUserSuccess {
    type: UserActionTypes.ADD_USER_LOADING_SUCCESS,
    payload: IUser[]
}

interface IAddUserFail {
    type: UserActionTypes.ADD_USER_LOADING_FAIL,
    payload: {error: IError}
}

interface ISetUserLoading {
    type: UserActionTypes.SET_USER_LOADING
}

interface ISetUserSuccess {
    type: UserActionTypes.SET_USER_LOADING_SUCCESS,
    payload: number
}

interface ISetUserFail {
    type: UserActionTypes.SET_USER_LOADING_FAIL,
    payload: {error: IError}
}

interface IArchiveUserLoading {
    type: UserActionTypes.ARCHIVE_USER
}

interface IArchiveUserSuccess {
    type: UserActionTypes.ARCHIVE_USER_SUCCESS,
    payload: IUser
}

interface IArchiveUserFail {
    type: UserActionTypes.ARCHIVE_USER_FAIL,
    payload: {error: IError}
}

interface IUserArchived {
    type: UserActionTypes.USER_ARCHIVED
}

interface IUserArchivedSuccess {
    type: UserActionTypes.USER_ARCHIVED_SUCCESS,
    payload: Boolean
}

interface IUserArchivedFail {
    type: UserActionTypes.USER_ARCHIVED_FAIL,
    payload: {error: IError}
}

interface IUserCreated {
    type: UserActionTypes.USER_CREATED
}

interface IUserCreatedSuccess {
    type: UserActionTypes.USER_CREATED_SUCCESS,
    payload: IUser
}

interface IUserCreatedFail {
    type: UserActionTypes.USER_CREATED_FAIL,
    payload: {error: IError}
}

interface IResetStatus {
    type: UserActionTypes.RESET_STATUS,
    payload: string
}




export type UserAction =
    IUserLoading | IUserFail | IUserSuccess | IAddUserLoading| IAddUserSuccess|
    IAddUserFail| ISetUserLoading| ISetUserSuccess | ISetUserFail| IArchiveUserLoading| IArchiveUserSuccess|
    IArchiveUserFail| IUserArchived| IUserArchivedSuccess| IUserArchivedFail| IUserCreated| IUserCreatedSuccess|
    IUserCreatedFail| IResetStatus