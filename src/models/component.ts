import {IUser} from "./user";
import {IComponentStatus} from "./componentStatus";
import {IDepartment} from "./department";

export interface IComponent {
    id: number,
    description: string,
    title: string,
    expectedStartDate: Date,
    expectedEndDate: Date,
    startedDate: Date,
    actualEndDate: Date,
    createdBy: IUser,
    componentStatus: IComponentStatus,
    department: IDepartment


}
