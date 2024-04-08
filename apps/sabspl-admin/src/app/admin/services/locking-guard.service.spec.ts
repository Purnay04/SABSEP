import { TestBed } from '@angular/core/testing';

import { LockingGuard } from './locking-guard.service';

describe('LockingGuard', () => {
  let service: LockingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockingGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
