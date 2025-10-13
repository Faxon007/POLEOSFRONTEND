import { ProfileDropdownModule } from './../../profile-dropdown/profile-dropdown.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { ChangePasswordModalModule } from 'src/app/pages/users/modal/change-password-modal/change-password-modal.module'
@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		ProfileDropdownModule,
		ChangePasswordModalModule,
	],
	exports: [HeaderComponent],
})
export class HeaderModule {}
