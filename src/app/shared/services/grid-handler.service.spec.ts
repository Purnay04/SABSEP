import { TestBed } from '@angular/core/testing';

import { GridHandlerService } from './grid-handler.service';

describe('GridHandlerService', () => {
  let service: GridHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
