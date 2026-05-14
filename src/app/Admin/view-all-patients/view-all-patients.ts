import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../Service/appointment-service';
import { ChangeDetectorRef } from '@angular/core';
import { PatientService } from '../../Patient/Servicess/patient-service';

@Component({
  selector: 'app-view-all-patients',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-all-patients.html',
  styleUrl: './view-all-patients.css',
})
export class ViewAllPatients {
  patients: any[] = [];
  constructor(private appointmentService: AppointmentService, private cd: ChangeDetectorRef, private patientService: PatientService) {};
  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.appointmentService.getAllPatients().subscribe({
      next: (res) => {
        console.log(res);
        this.patients = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

  delete(id: number) {
    if(confirm("Are you sure you want to delete this patient?")) {
      this.patientService.deletePatient(id).subscribe({
        next: (res) => {
          console.log(res);
          alert("Patient Deleted successfully!");
          this.loadPatients();
        },
        error: (err) =>{
          console.log(err)
          alert("Delete Failed!");
        }
      })
    }
  }
}
