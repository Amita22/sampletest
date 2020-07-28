import { TestBed } from '@angular/core/testing';

import { PlaceCardService } from './place-card.service';

describe('PlaceCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceCardService = TestBed.get(PlaceCardService);
    expect(service).toBeTruthy();
  });
});
