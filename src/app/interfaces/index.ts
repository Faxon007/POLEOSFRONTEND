export interface IOptions {
	every: string
	expiratedAt?: string
}
export interface IPage {
	title: string
	url: string
	icon: string
	path: string
	ref?: string
	isOpen?: boolean
	children?: IPage[] | []
	selected?: boolean
	
}

export interface IUser {
	id?: number
	name: string
	email: string
	picture?: string
	role?: IRole
	roleId?: number
	isActive?: boolean
	far?: string
	password?: string
	options?: IOptions
	favorites?: number[]
	BAR?: string
	LASTVIEW?: string
}

export interface ICategoryInRole {
	categoryId: number
	reports: number[]
}

export interface IRole {
	id: number
	name: string
	permissions: {
		reports: ICategoryInRole[]
		administrativeReports: boolean
		management: boolean
		rpa:boolean
		robotPermissions: Record<string, string[]>
	}
}

export interface IAuth {
	token: string
	isAuthenticated: boolean
	user: IUser
}

export interface ISideMenu {
	isMobile: boolean
	show: boolean
}

export type List<T = any> = T

export interface IColumn {
	label?: string
	field?: string | undefined
	klass?: string | undefined
	formatter?: (value: any, row?: any) => string
}

export interface ICategory {
	id?: number
	name: string
	description?: string
	reports?: IReport[]
}

export interface IPagination {
	rows: List[]
	count: number
	pages: number
}

export interface IReport {
	id?: number
	name: string
	url: string
	category: ICategory
	createdAt?: string
	categoryId?: number
	favorite?: boolean
}

export interface ILogin {
	email: string
	password: string
}

export interface IoptionSelection {
	label?: string
	value?: string
}

export interface IReportByCategory {
	id: number
	name: string
	description: string
	createdAt: string
	reports: IReport[]
}

export interface IRoles {
	id: number
	name: string
	permissions: any
	createdAt: string
}
export interface IRobot {
	id?: number
	name: string
	description?: string
	script?:string
	status?: string
	poleos?: IPoleo[]
	options?: string[];
}



export interface IPoleosInRole {
	poleos: number[]
}
export interface IRobotInExecution {
	robotId: number
	poleos: number[]
}

export interface IExecutions {
	id: number
	startDate: string
	execRobots: any
	createdAt: string
}


export interface IExecution {
	id?: number
	execRobots: {
		poleos: IRobotInExecution[]
	}
	startDate?: string
	weekDay?: string
	cronExpression?:string
	frequency?: string
	createdAt?: string
	status: string
	startDateOriginal?:string
	startDateForPicker?:string
	country: string
	
}

export interface IPoleo {
	id?: number
	title: string
	robot: IRobot
	robotId?: number
	country: string
	host: string
	user: string 
	password: string
	directory: string
	protocol: string
	port: number
}

export interface IAtp {
	id?: number
	title: string
	country: string
	host: string
	user: string 
	password: string
	directory: string
	protocol: string
	port: number
}

export interface IBitacora {
	id?: number
	option: string
	action: string
	oldObject?: string | object
	newObject?: string | object
	status: string
	message: string
	dateexec?: string
	user?: string
	createdAt?: string
	updatedAt?: string
	deletedAt?: string

}

