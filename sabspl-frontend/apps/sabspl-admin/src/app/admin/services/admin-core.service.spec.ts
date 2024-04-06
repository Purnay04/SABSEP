import { TestBed } from '@angular/core/testing';

import { AdminCoreService } from './admin-core.service';

describe('AdminCoreService', () => {
  let service: AdminCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
