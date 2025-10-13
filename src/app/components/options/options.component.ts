import { Component, OnInit } from '@angular/core'
import { title } from 'process'
import { Options } from 'src/app/utils/options'

@Component({
	selector: 'app-options',
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
	options = [
		{ title: 'Activar usuario', icon: 'power-outline' },
		{ title: 'Cambiar Contraseña', icon: 'lock-open-outline' },
		{ title: 'Editar', icon: 'create-outline' },
		{ title: 'Eliminar', icon: 'trash-outline' },
	]
	constructor(private optionsService: Options) {}

	ngOnInit() {}

	execute() {
		this.optionsService.setOption('changePassword')
	}
}
