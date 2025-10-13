import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ControlDevelopmentModalComponent } from './control-development-modal.component'

describe('ControlDevelopmentModalComponent', () => {
	let component: ControlDevelopmentModalComponent
	let fixture: ComponentFixture<ControlDevelopmentModalComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ControlDevelopmentModalComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(ControlDevelopmentModalComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
