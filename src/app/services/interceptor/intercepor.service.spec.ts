import { TestBed } from '@angular/core/testing'

import { InterceporService } from './intercepor.service'

describe('InterceporService', () => {
	let service: InterceporService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(InterceporService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
