import {ComponentAction, ComponentActionTypes} from "../actionTypes/component.actionTypes";
import {IComponent} from "../../models/component";

export interface IComponentState {
    components: IComponent[],
    componentId: number,
    isLoading: boolean,
    errorMessage: string,

}

const initialState: IComponentState = {
    isLoading: false,
    errorMessage: "",
    components: [] as IComponent[],
    componentId: 0
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
        default:
            return state;
    }
}

export default componentReducer;
