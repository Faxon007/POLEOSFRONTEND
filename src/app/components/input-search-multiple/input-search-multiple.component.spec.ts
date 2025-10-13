import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { InputSearchMultipleComponent } from './input-search-multiple.component'

describe('InputSearchMultipleComponent', () => {
	let component: InputSearchMultipleComponent
	let fixture: ComponentFixture<InputSearchMultipleComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [InputSearchMultipleComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(InputSearchMultipleComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
