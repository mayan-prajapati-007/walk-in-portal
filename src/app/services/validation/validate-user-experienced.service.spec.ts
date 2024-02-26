import { TestBed } from '@angular/core/testing';

import { ValidateUserExperiencedService } from './validate-user-experienced.service';

describe('ValidateUserExperiencedService', () => {
  let service: ValidateUserExperiencedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserExperiencedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
