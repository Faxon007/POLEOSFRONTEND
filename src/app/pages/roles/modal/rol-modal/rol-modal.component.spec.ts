import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { RolModalComponent } from './rol-modal.component'

describe('RolModalComponent', () => {
	let component: RolModalComponent
	let fixture: ComponentFixture<RolModalComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [RolModalComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(RolModalComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
