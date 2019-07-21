import { TestBed } from '@angular/core/testing';

import { VerifiedService } from './verified.service';

describe('VerifiedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifiedService = TestBed.get(VerifiedService);
    expect(service).toBeTruthy();
  });
});
