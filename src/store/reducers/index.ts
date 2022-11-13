import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import componentReducer from "./component.reducer";
import activityReducer from "./activity.reducer";
import UserReducer from "./user.reducer";

const reducers = combineReducers({
   login: loginReducer,
   component: componentReducer,
   activity: activityReducer,
   user: UserReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>
