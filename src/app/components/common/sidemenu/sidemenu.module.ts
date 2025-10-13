import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SidemenuComponent } from './sidemenu.component'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ItemMenuComponent } from './item-menu/item-menu.component'
import { ItemCollapseComponent } from './item-collapse/item-collapse.component'
import { ProfileDropdownModule } from '../../profile-dropdown/profile-dropdown.module'
@NgModule({
	declarations: [SidemenuComponent, ItemMenuComponent, ItemCollapseComponent],
	imports: [CommonModule, IonicModule, FormsModule, ProfileDropdownModule],
	exports: [SidemenuComponent, ItemMenuComponent, ItemCollapseComponent],
})
export class SidemenuModule {}
