import {IError} from "../../models/error";
import {IComponent} from "../../models/component";
import {IGanttActivity} from "../../models/activity";

export enum ComponentActionTypes {
    COMPONENT_LOADING = "COMPONENT_LOADING",
    COMPONENT_LOADING_SUCCESS = "COMPONENT_LOADING_SUCCESS",
    COMPONENT_LOADING_FAIL = "COMPONENT_LOADING_FAIL",
    ADD_COMPONENT_LOADING = "ADD_COMPONENT_LOADING",
    ADD_COMPONENT_LOADING_SUCCESS = "ADD_COMPONENT_LOADING_SUCCESS",
    ADD_COMPONENT_LOADING_FAIL = "COMPONENT_LOADING_FAIL",
    SET_COMPONENT_LOADING = "SET_COMPONENT_LOADING",
    SET_COMPONENT_LOADING_SUCCESS = "SET_COMPONENT_LOADING_SUCCESS",
    SET_COMPONENT_LOADING_FAIL = "SET_COMPONENT_LOADING_FAIL",
    COMPONENT_GANTT_LOADING = "COMPONENT_GANTT_LOADING",
    COMPONENT_GANTT_LOADING_SUCCESS = "COMPONENT_GANTT_LOADING_SUCCESS",
    COMPONENT_GANTT_LOADING_FAIL = "COMPONENT_GANTT_LOADING_FAIL",

    CLOSE_COMPONENT = "CLOSE_COMPONENT",
    CLOSE_COMPONENT_SUCCESS = "CLOSE_COMPONENT_SUCCESS",
    CLOSE_COMPONENT_FAIL = "CLOSE_COMPONENT_FAIL"
}

interface IComponentLoading {
    type: ComponentActionTypes.COMPONENT_LOADING
}

interface IComponentSuccess {
    type: ComponentActionTypes.COMPONENT_LOADING_SUCCESS,
    payload: IComponent[]
}

interface IComponentFail {
    type: ComponentActionTypes.COMPONENT_LOADING_FAIL,
    payload: {error: IError}
}

interface IAddComponentLoading {
    type: ComponentActionTypes.ADD_COMPONENT_LOADING
}

interface IAddComponentSuccess {
    type: ComponentActionTypes.ADD_COMPONENT_LOADING_SUCCESS,
    payload: IComponent[]
}

interface IAddComponentFail {
    type: ComponentActionTypes.ADD_COMPONENT_LOADING_FAIL,
    payload: {error: IError}
}

interface ISetComponentLoading {
    type: ComponentActionTypes.SET_COMPONENT_LOADING
}

interface ISetComponentSuccess {
    type: ComponentActionTypes.SET_COMPONENT_LOADING_SUCCESS,
    payload: number
}

interface ISetComponentFail {
    type: ComponentActionTypes.SET_COMPONENT_LOADING_FAIL,
    payload: {error: IError}
}


interface IGetGanttComponent {
    type: ComponentActionTypes.COMPONENT_GANTT_LOADING
}

interface IGetGanttComponentSuccess {
    type: ComponentActionTypes.COMPONENT_GANTT_LOADING_SUCCESS,
    payload: IGanttActivity[]
}

interface IGetGanttComponentFail {
    type: ComponentActionTypes.COMPONENT_GANTT_LOADING_FAIL,
    payload: {error: IError}
}


interface ICloseComponent {
    type: ComponentActionTypes.CLOSE_COMPONENT
}

interface ICloseComponentSuccess {
    type: ComponentActionTypes.CLOSE_COMPONENT_SUCCESS,
    payload: IComponent
}

interface ICloseComponentFail {
    type: ComponentActionTypes.CLOSE_COMPONENT_FAIL,
    payload: {error: IError}
}


export type ComponentAction =
    IComponentLoading | IComponentFail | IComponentSuccess | IAddComponentLoading| IAddComponentSuccess|
    IAddComponentFail| ISetComponentLoading| ISetComponentSuccess | ISetComponentFail | IGetGanttComponent|
    IGetGanttComponentSuccess |IGetGanttComponentFail| ICloseComponent| ICloseComponentSuccess| ICloseComponentFail