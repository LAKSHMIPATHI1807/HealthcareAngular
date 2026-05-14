import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorsToApprove } from './view-doctors-to-approve';

describe('ViewDoctorsToApprove', () => {
  let component: ViewDoctorsToApprove;
  let fixture: ComponentFixture<ViewDoctorsToApprove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDoctorsToApprove],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDoctorsToApprove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
