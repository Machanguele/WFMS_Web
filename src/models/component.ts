import {IUser} from "./user";
import {IComponentStatus} from "./componentStatus";
import {IDepartment} from "./department";
import {IActivity} from "./activity";

export interface IComponent {
    id: number,
    description: string,
    title: string,
    createdAt: string,
    expectedStartDate: string,
    expectedEndDate: string,
    startedDate: string,
    actualEndDate: string,
    createdBy: IUser,
    componentStatus: IComponentStatus,
    department: IDepartment,
    activities: IActivity[],
    finishedActivities: number,
    finished: boolean
}
