import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import componentReducer from "./component.reducer";

const reducers = combineReducers({
   login: loginReducer,
   component: componentReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>
