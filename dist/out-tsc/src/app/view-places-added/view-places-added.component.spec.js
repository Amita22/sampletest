import { async, TestBed } from '@angular/core/testing';
import { ViewPlacesAddedComponent } from './view-places-added.component';
describe('ViewPlacesAddedComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewPlacesAddedComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ViewPlacesAddedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=view-places-added.component.spec.js.map