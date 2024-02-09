import { TestBed } from '@angular/core/testing';

import { WalkInApplicationsService } from './walk-in-applications.service';

describe('WalkInApplicationsService', () => {
  let service: WalkInApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkInApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
