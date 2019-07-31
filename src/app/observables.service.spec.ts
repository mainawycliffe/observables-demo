import { TestBed } from '@angular/core/testing';

import { ObservablesService } from './observables.service';

describe('ObservablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservablesService = TestBed.get(ObservablesService);
    expect(service).toBeTruthy();
  });
});
