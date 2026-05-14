import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../Servicess/appointment-service';
import { PatientService } from '../Servicess/patient-service';
import { AuthService } from '../../auth-service';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-appointments',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-appointments.html',
  styleUrl: './view-appointments.css',
})
export class ViewAppointments {
  appointments: any[] = [];
  patient: any = {};

  constructor(private appointmentService: AppointmentService, private patientService: PatientService, private authService: AuthService, private cd: ChangeDetectorRef) {};

  ngOnInit() : void {
    this.loadAppointments();
  }

  loadAppointments() {
    const username = this.authService.getUsername();
    this.patientService.getPatientByName(username).subscribe({
      next: (res) => {
        console.log(res);
        this.patient = res;
        const patientId = res.patientId;
        this.cd.detectChanges();

        this.appointmentService.viewAppointments(patientId).subscribe({
          next: (appres) => {
            console.log(appres);
            this.appointments = appres;
            this.cd.detectChanges();
          },
          
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  };
  getStatusText(status:number): string {

    switch(status) {

      case 1:
        return 'Booked';

      case 2:
        return 'Cancelled';

      case 3:
        return 'Completed';

      default:
        return 'Unknown';
    }
  };

  cancel(id: number) {
    this.appointmentService.cancelAppointment(id).subscribe({
      next: () => {
        alert("Appointment Cancelled!");
        this.loadAppointments();
      },
      error: (err) => {
        console.log(err);
      }
    })
  };

   updateStatus(id:number, status:string) {

    if(status == 'cancel') {

      this.cancel(id);

    }
    else {

      alert("Please Select Status");

    }
  }
}
