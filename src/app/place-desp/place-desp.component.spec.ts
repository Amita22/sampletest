import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDespComponent } from './place-desp.component';

describe('PlaceDespComponent', () => {
  let component: PlaceDespComponent;
  let fixture: ComponentFixture<PlaceDespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
