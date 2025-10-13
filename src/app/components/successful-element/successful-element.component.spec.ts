import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { SuccessfulElementComponent } from './successful-element.component'

describe('SuccessfulComponent', () => {
	let component: SuccessfulElementComponent
	let fixture: ComponentFixture<SuccessfulElementComponent>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SuccessfulElementComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(SuccessfulElementComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
