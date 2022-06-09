import {IRole} from "./role";

export interface ILogin {
    fullName: string,
    username: string,
    email: string,
    token: string,
    refreshToken: string,
    role: IRole
}
