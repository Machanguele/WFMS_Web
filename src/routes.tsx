import Login from "../src/views/Login";
import Recover from "../src/views/Recover";
import Dashboard from "../src/views/Dashboard";
import Notifications from "../src/views/Notifications";
import Icons from "../src/views/Icons";
import Typography from "../src/views/Typography";
import {Kanban} from "./views/Kanban";
import Departament from "./views/Departament";
import Component from "./views/Components";
import Estatistica from "./views/Estatisticas";
import UsersComponent from "./views/Users";
import {Configurations} from "./views/Configurations";

const routes = [
	{
		path: "/login",
		name: "Login",
		icon: "nc-icon nc-bank",
		component: Login,
		layout: "/auth",
		invisible: true,
		roles: ''

	},
	{
		path: "/recover",
		name: "Recover",
		icon: "nc-icon nc-bank",
		component: Recover,
		layout: "/auth",
		invisible: true,
		roles: ''

	},
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "nc-icon nc-map-big",
		component: Dashboard,
		layout: "/admin",
		invisible: false,
		roles: 'Director, Gestor de actividades, TI de Suporte, Operador Transacional'
	},
	{
		path: "/componentes",
		name: "Componentes",
		icon: "nc-icon nc-tile-56",
		component: Component,
		layout: "/admin",
		invisible: false,
		roles: 'Director, Gestor de actividades, Operador Transacional'
	},

	{
		path: "/actividades",
		name: "Actividades",
		icon: "nc-icon nc-tile-56",
		component: Kanban,
		layout: "/admin",
		invisible: true,
		roles: ''
	},
	{
		path: "/relatorios",
		name: "Relatórios",
		icon: "nc-icon nc-chart-bar-32",
		component: Estatistica,
		layout: "/admin",
		invisible: false,
		roles: 'Director, Gestor de actividades',

	},
	{
		path: "/icons",
		name: "Icons",
		icon: "nc-icon nc-diamond",
		component: Icons,
		layout: "/admin2",
		invisible: true,
		roles:''
	},


	{
		path: "/tables",
		name: "Utilizadores",
		icon: "nc-icon nc-settings-gear-65",
		component: Departament,
		layout: "/admin",
		invisible: true,
		roles:''
	},

{
		path: "/Configuracoes",
		name: "Configurações",
		icon: "nc-icon nc-settings-gear-65",
		component: Configurations,
		layout: "/admin",
		invisible: false,
		roles: 'TI de Suporte, Director'
	},

	{
		path: "/notifications",
		name: "Notificacoes2",
		icon: "nc-icon nc-bell-55",
		component: Notifications,
		layout: "/admin",
		invisible: true,
		roles:''
	},
	{
		path: "/user-page",
		name: "Meu Perfil",
		icon: "nc-icon nc-single-02",
		component: Departament,
		layout: "/admin",
		invisible: true,
		roles:''
	},
	{
		path: "/users",
		name: "Utilizadores",
		icon: "nc-icon nc-single-02",
		component: UsersComponent,
		layout: "/admin",
		invisible: true,
		roles:''
	},
/*	{
		path: "/user-page",
		name: "Meu Perfil",
		icon: "nc-icon nc-single-02",
		component: UserPage,
		layout: "/admin",
		invisible: false,
	},*/

	{
		path: "/typography",
		name: "Typography",
		icon: "nc-icon nc-caps-small",
		component: Typography,
		layout: "/admin2",
		invisible: true,
		roles:''
	}
];
export default routes;
