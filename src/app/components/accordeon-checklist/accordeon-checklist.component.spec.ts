import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { AccordeonChecklistComponent } from './accordeon-checklist.component'

describe('AccordeonChecklistComponent', () => {
	let component: AccordeonChecklistComponent
	let fixture: ComponentFixture<AccordeonChecklistComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AccordeonChecklistComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(AccordeonChecklistComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
