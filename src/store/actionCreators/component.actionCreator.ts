import {Dispatch} from "redux";
import {Api} from "../../services/api";
import {ComponentAction, ComponentActionTypes} from "../actionTypes/component.actionTypes";
import {IComponent} from "../../models/component";

export const componentAction = () =>
    async (dispatch: Dispatch<ComponentAction>) => {
    let api = new Api();

    try {
        dispatch({
            type: ComponentActionTypes.COMPONENT_LOADING
        });

        await api.get<IComponent[]>("Components", {})
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: ComponentActionTypes.COMPONENT_LOADING_SUCCESS,
                        payload: response.data
                    });
                }
            })
            .catch(e => {
               dispatch({
                   type: ComponentActionTypes.COMPONENT_LOADING_FAIL,
                   payload: e
               })
            });
    }catch (e: any) {
        dispatch({
            type: ComponentActionTypes.COMPONENT_LOADING_FAIL,
            payload: e
        })
    }
    }
