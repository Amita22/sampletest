import { TestBed } from '@angular/core/testing';

import { PlaceDespService } from './place-desp.service';

describe('PlaceDespService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceDespService = TestBed.get(PlaceDespService);
    expect(service).toBeTruthy();
  });
});
