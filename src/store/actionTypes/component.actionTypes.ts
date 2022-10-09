import {IError} from "../../models/error";
import {IComponent} from "../../models/component";

export enum ComponentActionTypes {
    COMPONENT_LOADING = "COMPONENT_LOADING",
    COMPONENT_LOADING_SUCCESS = "COMPONENT_LOADING_SUCCESS",
    COMPONENT_LOADING_FAIL = "COMPONENT_LOADING_FAIL",
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


export type ComponentAction =
    IComponentLoading | IComponentFail | IComponentSuccess