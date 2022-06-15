import { TestBed } from '@angular/core/testing';

import { AccentService } from './accent-service.service';

describe('AccentService', () => {
  let service: AccentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
