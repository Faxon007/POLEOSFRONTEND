import { Component, OnInit } from '@angular/core'
import { IColumn } from 'src/app/interfaces'
import { ControlDevelopmentService } from 'src/app/services/control-development/control-development.service'

@Component({
	selector: 'app-control-development',
	templateUrl: './control-development.page.html',
	styleUrls: ['./control-development.page.scss'],
})
export class ControlDevelopmentPage implements OnInit {
	columns: IColumn[] = [
		{
			label: 'Categoría',
			field: 'category.name',
			klass: 'w-[300px]',
		},
		{
			label: 'Nombre',
			field: 'name',
		},
		{
			label: 'Url',
			field: 'url',
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
			event: (data: any) => {
				const report = JSON.parse(JSON.stringify(data))
			},
		},
		{
			title: 'Eliminar',
			icon: 'trash-outline',
			event: async () => {
			},
		},
	]
	loading: boolean = false
	constructor(public controlDevelopmentService: ControlDevelopmentService) {}

	ngOnInit() {
		const data = this.controlDevelopmentService.getControlDevelopment()
		this.controlDevelopmentService.setControlDevelopment(data)
	}

	openReportModal() {}

	onChangePage(event: any) {}
}
