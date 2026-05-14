import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AppointmentService } from '../../Patient/Servicess/appointment-service';
import { DoctorService } from '../services/doctor-service';import { AuthService } from '../../auth-service';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../services/appointment-service';

@Component({
  selector: 'app-view-doctor-appointments',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-doctor-appointments.html',
  styleUrl: './view-doctor-appointments.css',
})
export class ViewDoctorAppointments {
  appointments: any[] = [];
  doctor: any = {};

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private authService: AuthService, private cd: ChangeDetectorRef) {};

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const username = this.authService.getUsername();
    this.doctorService.getDoctorByName(username).subscribe({
      next: (res) => {
        console.log(res);
        this.doctor = res;
        const doctorId = res.doctorId;
        this.cd.detectChanges();

        this.appointmentService.viewDoctorAppointments(doctorId).subscribe({
          next: (appres) => {
            console.log(appres);
            this.appointments = appres;
            this.cd.detectChanges();
          },
          error: (err) => {
            console.log(err);
          }
        })
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

  complete(id: number) {
    this.appointmentService.completeAppointment(id).subscribe({
      next: (res) => {
        alert("Appointment Completed!");
        this.loadAppointments();
      },
      error: (err) => {
        console.log(err);
      }
    })
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

    if(status == 'complete') {

      this.complete(id);

    }

    else if(status == 'cancel') {

      this.cancel(id);

    }

    else {

      alert("Please Select Status");

    }
  }
}
