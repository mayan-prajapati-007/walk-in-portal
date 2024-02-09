import { TestBed } from '@angular/core/testing';

import { JobRolesService } from './job-roles.service';

describe('JobRolesService', () => {
  let service: JobRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
