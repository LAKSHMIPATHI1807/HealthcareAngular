import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../Service/appointment-service';
import { ChangeDetectorRef } from '@angular/core';
import { DoctorService } from '../../Doctor/services/doctor-service';

@Component({
  selector: 'app-view-doctors',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-doctors.html',
  styleUrl: './view-doctors.css',
})
export class ViewDoctors {
  doctors: any[] = [];
  constructor(private appointmentService: AppointmentService, private cd: ChangeDetectorRef, private doctorService: DoctorService) {};
  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.appointmentService.getAllDoctors().subscribe({
      next: (res) => {
        console.log(res);
        this.doctors = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

   delete(id: number) {
    if(confirm("Are you sure you want to remove this doctor?")) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: (res) => {
          console.log(res);
          alert("Doctor removed successfully!");
          this.loadDoctors();
        },
        error: (err) =>{
          console.log(err)
          alert("Delete Failed!");
        }
      })
    }
  }
}
