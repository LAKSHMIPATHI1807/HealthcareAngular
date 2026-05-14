import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PatientService } from '../Servicess/patient-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css',
})
export class ViewProfile {
  constructor(private service: PatientService, private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {}
  patient: any = {};
  message = '';
  isEditMode = false;

  ngOnInit(): void {
    this.loadProfile();
  }
  loadProfile() {
    const name = this.authService.getUsername();
    console.log(name);
    this.service.getPatientByName(name).subscribe({
      next: (res) => {
        console.log(res);
        this.patient = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert("Error fetching profile!")
      }
    });
  };

  enableEdit() {

    this.isEditMode = true;
  }

  updatePatient() {
    this.service.updatePatient(this.patient.patientId, this.patient).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Profile Updated Successfully';
        alert("Patient updated successfully!");
        this.isEditMode = false;
        this.cd.detectChanges();
        },
      error: (err) => {
        console.log(err);
        alert("Error updating details!");
      }
    });
  }

  deletePatient() {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) 
      { 
        return;
      }
    this.service.deletePatient(this.patient.patientId).subscribe({
      next: (res) => {
        console.log(res);
        this.message = 'Profile Deleted Successfully';
        alert("Patient deleted successfully!");
        this.patient = null;
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        console.log(err);
        alert("Error deleting patient!");
      }
    });
  }
}
