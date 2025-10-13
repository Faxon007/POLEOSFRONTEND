import { TestBed } from '@angular/core/testing'

import { ForgotPasswordService } from './forgot-password.service'

describe('ChangePasswordService', () => {
	let service: ForgotPasswordService

	beforeEach(() => {
		TestBed.configureTestingModule({})
		service = TestBed.inject(ForgotPasswordService)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
})
