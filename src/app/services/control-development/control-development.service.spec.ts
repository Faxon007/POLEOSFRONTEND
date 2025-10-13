import { TestBed } from '@angular/core/testing'

import { ControlDevelopmentService } from './control-development.service'

describe('ControlDevelopmentService', () => {
	let service: ControlDevelopmentService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(ControlDevelopmentService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
