import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ControlDevelopmentPage } from './control-development.page'

describe('ControlDevelopmentPage', () => {
	let component: ControlDevelopmentPage
	let fixture: ComponentFixture<ControlDevelopmentPage>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ControlDevelopmentPage],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(ControlDevelopmentPage)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
