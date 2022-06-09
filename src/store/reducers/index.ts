import { combineReducers } from "redux";
import loginReducer from "./login.reducer";

const reducers = combineReducers({
   login: loginReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>
