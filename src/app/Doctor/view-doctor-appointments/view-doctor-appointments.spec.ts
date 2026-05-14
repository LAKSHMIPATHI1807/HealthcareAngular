import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorAppointments } from './view-doctor-appointments';

describe('ViewDoctorAppointments', () => {
  let component: ViewDoctorAppointments;
  let fixture: ComponentFixture<ViewDoctorAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoctorAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDoctorAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
