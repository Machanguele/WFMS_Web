import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import componentReducer from "./component.reducer";
import activityReducer from "./activity.reducer";

const reducers = combineReducers({
   login: loginReducer,
   component: componentReducer,
   activity: activityReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>
