import React from "react";
export interface IRoute {
    path: string,
    name: string,
    icon: string,
    component: React.ComponentType<any>,
    layout: string
    invisible: boolean,
    roles: string
}
