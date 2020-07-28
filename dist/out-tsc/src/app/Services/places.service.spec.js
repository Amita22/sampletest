import { TestBed } from '@angular/core/testing';
import { PlacesService } from './places.service';
describe('PlacesService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(PlacesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=places.service.spec.js.map