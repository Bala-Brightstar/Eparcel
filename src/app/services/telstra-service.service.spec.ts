import { TestBed } from '@angular/core/testing';

import { TelstraServiceService } from './telstra-service.service';

describe('TelstraServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelstraServiceService = TestBed.get(TelstraServiceService);
    expect(service).toBeTruthy();
  });
});
