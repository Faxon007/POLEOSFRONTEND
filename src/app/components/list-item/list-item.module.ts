import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListItemComponent } from './list-item.component'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { PipesModule } from 'src/app/pipes/pipes.module'

@NgModule({
	declarations: [ListItemComponent],
	imports: [CommonModule, IonicModule, FormsModule, PipesModule],
	exports: [ListItemComponent],
})
export class ListItemModule {}
