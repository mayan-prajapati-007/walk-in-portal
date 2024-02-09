import { TestBed } from '@angular/core/testing';

import { WalkInApplicationFormatService } from './walk-in-application-format.service';

describe('WalkInApplicationFormatService', () => {
  let service: WalkInApplicationFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkInApplicationFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
