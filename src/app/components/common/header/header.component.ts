import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core'
import { SideMenuStore } from 'src/app/utils/sidemenu'
import { Platform } from '@ionic/angular'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() title: string | undefined
	@Input() subtitle: string | undefined
	constructor(
		public sideMenuStore: SideMenuStore,
		public platform: Platform
	) {}

	ngOnInit() {}

	openSideMenu(): void {
		this.sideMenuStore.setSideMenu(
			{
				isMobile: this.sideMenuStore.sidemenuValue.isMobile,
				show: !this.sideMenuStore.sidemenuValue.show,
			},
			this.sideMenuStore.sidemenuValue.isMobile
		)

		// * this.sideMenuStore.sidemenuValue.show
		// * es true cuando se muestra completo cuando se muestra pequeño es false
	}
}
