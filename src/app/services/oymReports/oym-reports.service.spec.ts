import { TestBed } from '@angular/core/testing';

import { OymReportsService } from './oym-reports.service';

describe('OymReportsService', () => {
  let service: OymReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OymReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
