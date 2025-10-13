import { ProfileDropdownComponent } from './profile-dropdown.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { PipesModule } from 'src/app/pipes/pipes.module'
import { ToggleThemeModule } from '../toggle-theme/toggle-theme.module'
import { AlertModalModule } from '../modals/alert-modal/alert-modal.module'
@NgModule({
	declarations: [ProfileDropdownComponent],
	imports: [
		CommonModule,
		IonicModule,
		FormsModule,
		PipesModule,
		ToggleThemeModule,
	],
	exports: [ProfileDropdownComponent],
})
export class ProfileDropdownModule {}
