import {IPermission} from "./permission";

export interface IRole {
    description: string,
    name: string,
    permissions: Array<IPermission>
}
