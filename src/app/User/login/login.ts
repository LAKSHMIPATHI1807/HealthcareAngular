import { Component, inject } from '@angular/core';
import { UserService } from '../Services/user-service';
import { LoginUser } from '../Models/user';
import { LoginResponse, TokenPayLoad } from '../Models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user : LoginUser = {
    username: '',
    password: ''
  };

  message: string='';

  constructor(private userService: UserService, private router: Router, private cd: ChangeDetectorRef, private authService: AuthService) {};

  login(form: any) {
    if (form.invalid) {
      this.message = 'Please enter username and password';
      return;
    }
    this.message='';
    this.userService.login(this.user).subscribe({
      next: (res: LoginResponse) => {
        this.authService.saveToken(res.password);
        const decoded: any = jwtDecode<TokenPayLoad>(res.password);
        console.log('Decoded token: ', decoded);
        console.log('Login success:', res);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        alert("Login Successful!");
        console.log(role);
        if (role == "Admin") {
          this.router.navigateByUrl('/admin-dashboard');
        }
        else if (role == "Doctor") {
          this.router.navigateByUrl('/doctor-dashboard');
        }
        else if (role == "Patient") {
          this.router.navigateByUrl('/patient-dashboard');
        }
        this.cd.detectChanges();
        this.user = {
          username: '',
          password: ''
        };
      },
      error: () => {
        this.message = "Invalid username or password!";
      }
    });
  }
}
