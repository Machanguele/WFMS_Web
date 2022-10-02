import {IUser} from "./user";
import {IActivityStatus} from "./activityStatus";
import {IActivityType} from "./activityType";
import {IComponent} from "./component";

export interface IActivity {
    id: number,
    description: string,
    createdAt: Date,
    starAt: Date,
    endAt: Date,
    createdBy: IUser,
    allocatedTo: IUser,
    activityStatus: IActivityStatus,
    activityType: IActivityType,
    component: IComponent
}
