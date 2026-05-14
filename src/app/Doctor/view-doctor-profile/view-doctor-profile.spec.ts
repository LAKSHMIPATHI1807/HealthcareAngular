import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorProfile } from './view-doctor-profile';

describe('ViewDoctorProfile', () => {
  let component: ViewDoctorProfile;
  let fixture: ComponentFixture<ViewDoctorProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoctorProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDoctorProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
