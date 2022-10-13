import {IUser} from "./user";
import {IActivityStatus} from "./activityStatus";
import {IActivityType} from "./activityType";
import {IComponent} from "./component";

export interface IActivityHelper{
    id: number,
    description: string,
    name: string,
    createdAt: string,
    starAt: string,
    endAt: string,
    createdBy: string,
    allocatedTo: string,
    activityStatus: IActivityStatus,
    status: IActivityStatus,
    expectedEndDate: string,
    expectedStarDate: string
}

export interface IActivity {
    id: number,
    totalActivities: number
    status: IActivityStatus,
    activities: IActivityHelper[]
}
