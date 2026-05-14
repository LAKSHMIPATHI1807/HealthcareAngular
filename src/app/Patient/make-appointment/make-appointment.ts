import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../Servicess/appointment-service';
import { DoctorService } from '../Servicess/doctor-service';
import { PatientService } from '../Servicess/patient-service';
import { AuthService } from '../../auth-service';
import { AddAppointment } from '../Models/appointment';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-make-appointment',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './make-appointment.html',
  styleUrl: './make-appointment.css',
})
export class MakeAppointment {
  doctors: any[] = [];
  patient: any = {};
  message = '';
  appointmentObj: AddAppointment = {
    patientId: 0,
    doctorId: 0
  };

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {};

  ngOnInit(): void{
    this.loadPatient();
    this.loadDoctors();
  }

  loadPatient() {
    const username =
      this.authService.getUsername();

    this.patientService
      .getPatientByName(username)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.patient = res;

          this.appointmentObj.patientId =
            res.patientId;
            this.cd.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        console.log(res);
        this.doctors = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submit() {
    console.log(this.appointmentObj);

    this.appointmentService.makeappointment(this.appointmentObj).subscribe({
      next: (res) => {
        console.log(res);
        this.message = "Appointment booked successfully!";
        alert("Appointment booked successfully!");
        this.cd.detectChanges();

        this.appointmentObj = {
          patientId: this.patient.patientId,
          doctorId: 0
        };
      },
      error: (err) => {
        console.log(err);
        this.message = "Failed to book appointment!";
        alert("Failed to book appointment!");
      }
    })
  }
}
