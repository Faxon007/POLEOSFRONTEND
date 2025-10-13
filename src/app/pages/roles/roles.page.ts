import { Component, OnInit } from '@angular/core'
import { curry } from 'lodash'
import { exit } from 'process'
import { IColumn, IPagination, IRole, IUser } from 'src/app/interfaces'
import { RolService } from 'src/app/services/rol/rol.service'
import { UserService } from 'src/app/services/user/user.service'
import { OpenModalService } from './openModal/open-modal'
import { LIMIT } from 'src/app/services/common/httpOptions'
@Component({
	selector: 'app-roles',
	templateUrl: './roles.page.html',
	styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
	columns: IColumn[] = [
		{
			label: 'Nombre del rol',
			field: 'name',
			klass: '',
		},
		{
			label: '',
			field: 'actions',
			klass: 'w-[100px]',
		},
	]

	listOptions: any[] = [
		{
			title: 'Editar',
			icon: 'create-outline',
			event: (rol: IRole) => {
				const DATA = JSON.stringify(rol)
				this.openModalService.openRolModal('edit', JSON.parse(DATA))
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async (rol: any) => {
				this.openModalService.openDeleteRolModal(rol)
			},
		},
	]
	loading: boolean = false
	limit = LIMIT
	constructor(
		public rolService: RolService,
		private openModalService: OpenModalService,
		private roleService: RolService,
		private userService: UserService
	) {}

	ngOnInit() {
		// this.openModalService.openRolModal('Agregar rol');

		this.roleService
			.getAllRoles(1, this.limit)
			.subscribe((data: IPagination) => {
				this.rolService.setRoles(data)
			})
	}

	openRoleModal() {
		this.openModalService.openRolModal('create', { name: '' } as IRole)
	}

	searchRoles(value: string) {
		this.rolService.currentPage = 1
		this.roleService
			.getAllRoles(1, this.limit, value)
			.subscribe((data) => this.roleService.setRoles(data))
	}

	async onChangePage(page: number) {
		this.rolService.currentPage = page
		this.rolService
			.getAllRoles(page, this.limit)
			.subscribe((data) => this.rolService.setRoles(data))
	}
}
