import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PopoverOptionsComponent } from './popover-options.component'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@NgModule({
	declarations: [PopoverOptionsComponent],
	imports: [CommonModule, FormsModule, IonicModule, RouterModule],
	exports: [PopoverOptionsComponent],
})
export class PopoverOptionsModule {}
