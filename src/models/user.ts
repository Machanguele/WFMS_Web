import {IRole} from "./role";

export interface IUser {
    fullName: string,
    username: string,
    email: string,
    role: IRole
}
