import { IonicModule } from '@ionic/angular'
import { ToggleThemeComponent } from './toggle-theme.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [ToggleThemeComponent],
	imports: [CommonModule, IonicModule, FormsModule],
	exports: [ToggleThemeComponent],
})
export class ToggleThemeModule {}
