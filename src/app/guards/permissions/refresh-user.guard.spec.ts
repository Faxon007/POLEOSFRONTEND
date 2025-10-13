import { TestBed } from '@angular/core/testing';

import { RefreshUserGuard } from './refresh-user.guard';

describe('RefreshUserGuard', () => {
  let guard: RefreshUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RefreshUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
