import axios from "axios";

export const api = axios.create({
    baseURL: 'https://localhost:5001/api/'
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

