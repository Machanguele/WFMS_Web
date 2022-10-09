import {ComponentAction, ComponentActionTypes} from "../actionTypes/component.actionTypes";
import {IComponent} from "../../models/component";

export interface IComponentState {
    components: IComponent[],
    isLoading: boolean,
    errorMessage: string
}

const initialState: IComponentState = {
    isLoading: false,
    errorMessage: "",
    components: [] as IComponent[]
}

const componentReducer = (state: IComponentState = initialState, action: ComponentAction) => {
    switch (action.type) {
        case ComponentActionTypes.COMPONENT_LOADING:
            return {...state, isLoading: true}
        case ComponentActionTypes.COMPONENT_LOADING_SUCCESS:
            return {...state, isLoading: false, components: action.payload}
        case ComponentActionTypes.COMPONENT_LOADING_FAIL:
            return {...state, isLoading: false}
        default:
            return state;
    }
}

export default componentReducer;
