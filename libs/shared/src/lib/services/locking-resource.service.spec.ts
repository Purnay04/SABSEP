import { TestBed } from '@angular/core/testing';

import { LockingResourceService } from './locking-resource.service';

describe('LockingResourceService', () => {
  let service: LockingResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockingResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
