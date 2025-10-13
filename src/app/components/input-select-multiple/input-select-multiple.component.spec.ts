import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { InputSelectMultipleComponent } from './input-select-multiple.component'

describe('InputSelectMultipleComponent', () => {
	let component: InputSelectMultipleComponent
	let fixture: ComponentFixture<InputSelectMultipleComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [InputSelectMultipleComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(InputSelectMultipleComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
