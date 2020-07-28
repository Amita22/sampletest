import { TestBed } from '@angular/core/testing';

import { AddHotelsService } from './add-hotels.service';

describe('AddHotelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddHotelsService = TestBed.get(AddHotelsService);
    expect(service).toBeTruthy();
  });
});
