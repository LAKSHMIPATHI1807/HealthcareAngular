import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard {
  username = ''; 
  constructor(private authService: AuthService, private router: Router) {};
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log(this.username);
  };
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
