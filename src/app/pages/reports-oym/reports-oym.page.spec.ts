import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { ReportsOymPage } from './reports-oym.page'

describe('ReportsOymPage', () => {
	let component: ReportsOymPage
	let fixture: ComponentFixture<ReportsOymPage>

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ReportsOymPage],
			imports: [IonicModule.forRoot()],
		}).compileComponents()

		fixture = TestBed.createComponent(ReportsOymPage)
		component = fixture.componentInstance
		fixture.detectChanges()
	}))

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
