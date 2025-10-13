import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { InputAutocompleteComponent } from './input-autocomplete.component'

describe('InputAutocompleteComponent', () => {
	let component: InputAutocompleteComponent
	let fixture: ComponentFixture<InputAutocompleteComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [InputAutocompleteComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(InputAutocompleteComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
