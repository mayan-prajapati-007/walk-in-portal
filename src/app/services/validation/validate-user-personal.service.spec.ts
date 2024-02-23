import { TestBed } from '@angular/core/testing';

import { ValidateUserPersonalService } from './validate-user-personal.service';

describe('ValidateUserPersonalService', () => {
  let service: ValidateUserPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
