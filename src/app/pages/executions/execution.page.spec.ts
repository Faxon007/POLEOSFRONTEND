import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ExecutionsPage } from './execution.page'

describe('ExecutionsPage', () => {
	let component: ExecutionsPage
	let fixture: ComponentFixture<ExecutionsPage>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ExecutionsPage],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(ExecutionsPage)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
