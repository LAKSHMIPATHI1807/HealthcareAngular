import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../Service/appointment-service';
// import { AuthService } from '../../auth-service';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-all-appointments',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-all-appointments.html',
  styleUrl: './view-all-appointments.css',
})
export class ViewAllAppointments {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService, private cd: ChangeDetectorRef) {};

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe({
      next: (res) => {
        console.log(res);
        this.appointments = res;
        this.cd.detectChanges();
      },
      error: (err) => {
            console.log(err);
      }
    })
  }

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
