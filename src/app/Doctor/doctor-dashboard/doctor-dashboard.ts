import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [RouterModule,CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {
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
