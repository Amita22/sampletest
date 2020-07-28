import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelAddedComponent } from './view-hotel-added.component';

describe('ViewHotelAddedComponent', () => {
  let component: ViewHotelAddedComponent;
  let fixture: ComponentFixture<ViewHotelAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHotelAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHotelAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
