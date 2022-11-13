import axios from "axios";
import {IUser} from "../models/user";

export const token = ()=>{
    let aux = localStorage.getItem('token')

    console.log("Tokkkkkkkkkkkkkkkkkkkkken ", aux)
    return aux;

}

export const api = axios.create({
    baseURL: 'https://localhost:5001/api/',
    headers: { Authorization: `Bearer' ${token()}`,

    }
})



export class Api {

    public get<T>(url: string, data: any){
        return api.get<T>(url, data);
    }

    public post<T>(url: string, data: any){
        return api.post<T>(url, data);
    }

    public put<T>(url: string, data: any){
        return api.put<T>(url, data);
    }

    public delete<T>(url: string){
        return api.delete<T>(url);
    }
}

