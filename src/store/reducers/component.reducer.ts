import {ComponentAction, ComponentActionTypes} from "../actionTypes/component.actionTypes";
import {IComponent} from "../../models/component";
import {IGanttActivity} from "../../models/activity";

export interface IComponentState {
    components: IComponent[],
    componentId: number,
    isLoading: boolean,
    errorMessage: string,
    gantComponents: IGanttActivity[]

}

const initialState: IComponentState = {
    isLoading: false,
    errorMessage: "",
    components: [] as IComponent[],
    componentId: 0,
    gantComponents: [] as IGanttActivity[]
}

const componentReducer = (state: IComponentState = initialState, action: ComponentAction) => {
    switch (action.type) {
        case ComponentActionTypes.COMPONENT_LOADING:
            return {...state, isLoading: true}
        case ComponentActionTypes.COMPONENT_LOADING_SUCCESS:
            return {...state, isLoading: false, components: action.payload}
        case ComponentActionTypes.COMPONENT_LOADING_FAIL:
            return {...state, isLoading: false}

        case ComponentActionTypes.ADD_COMPONENT_LOADING:
            return {...state, isLoading: true}
        case ComponentActionTypes.ADD_COMPONENT_LOADING_SUCCESS:
            return {...state, isLoading: false}
        case ComponentActionTypes.ADD_COMPONENT_LOADING_FAIL:
            return {...state, isLoading: false}
        case ComponentActionTypes.SET_COMPONENT_LOADING_SUCCESS:
            return {...state, componentId: action.payload }

        case ComponentActionTypes.COMPONENT_GANTT_LOADING:
            return {...state, isLoading: false}
        case ComponentActionTypes.COMPONENT_GANTT_LOADING_SUCCESS:
            return {...state, isLoading: false, gantComponents: action.payload}
        case ComponentActionTypes.COMPONENT_GANTT_LOADING_FAIL:
            return {...state, isLoading: false }

        default:
            return state;
    }
}

export default componentReducer;
