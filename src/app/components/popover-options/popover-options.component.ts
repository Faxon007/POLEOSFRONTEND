import { Component, Input, OnInit } from '@angular/core'
// import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Router } from '@angular/router'
import { PopoverController, NavParams } from '@ionic/angular'

@Component({
	selector: 'app-popover-options',
	templateUrl: './popover-options.component.html',
	styleUrls: ['./popover-options.component.scss'],
})
export class PopoverOptionsComponent implements OnInit {
	@Input() options: any[] = []
	@Input() data: any
	constructor(
		// public darkMode: DarkModeService,
		private router: Router,
		public popoverController: PopoverController,
		private navParams: NavParams
	) {}

	ngOnInit() {}

	close() {
		this.popoverController.dismiss()
	}

	setEvent(event: any) {
		event(this.data)
		this.close()
	}
}
