import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../Service/appointment-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  username = ''; 
  totalDoctors: number = 0;
  totalPatients: number = 0;
  totalAppointments: number = 0;
  totalBooked: number = 0;
  totalCompleted: number = 0;
  totalCancelled: number = 0;

  constructor(public authService: AuthService, private router: Router,private appointmentService: AppointmentService, private cd: ChangeDetectorRef) {};

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log(this.username);
    this.getDashboardCounts();
  };

  getDashboardCounts() {
    this.appointmentService.getAllDoctors().subscribe({
      next: (res: any[]) => {
        this.totalDoctors = res.length;
        console.log("Doctor Count: ",this.totalDoctors);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any[]) => {
        this.totalAppointments = res.length;
        // Booked = 1
        this.totalBooked = res.filter(
          x => x.status == 1
        ).length;

        // Completed = 2
        this.totalCompleted = res.filter(
          x => x.status == 3
        ).length;

        // Cancelled = 3
        this.totalCancelled = res.filter(
          x => x.status == 2
        ).length;

        console.log("Appointment Count: ",this.totalAppointments);
        console.log('Booked:', this.totalBooked);
        console.log('Completed:', this.totalCompleted);
        console.log('Cancelled:', this.totalCancelled);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.appointmentService.getAllPatients().subscribe({
      next: (res: any[]) => {
        this.totalPatients = res.length;
        console.log("Patient Count: ",this.totalPatients);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
