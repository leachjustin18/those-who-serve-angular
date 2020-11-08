import { TestBed } from '@angular/core/testing';

import { DateValidatorService } from './date-validator.service';

describe('DateValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateValidatorService = TestBed.get(DateValidatorService);
    expect(service).toBeTruthy();
  });
});
