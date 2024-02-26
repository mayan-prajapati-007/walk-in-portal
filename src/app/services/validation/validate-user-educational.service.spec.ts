import { TestBed } from '@angular/core/testing';

import { ValidateUserEducationalService } from './validate-user-educational.service';

describe('ValidateUserEducationalService', () => {
  let service: ValidateUserEducationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateUserEducationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
