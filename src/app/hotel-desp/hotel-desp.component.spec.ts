import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDespComponent } from './hotel-desp.component';

describe('HotelDespComponent', () => {
  let component: HotelDespComponent;
  let fixture: ComponentFixture<HotelDespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
