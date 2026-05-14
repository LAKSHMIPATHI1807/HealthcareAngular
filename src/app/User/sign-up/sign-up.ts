import { Component } from '@angular/core';
import { UserService } from '../Services/user-service';
import { RegisterUser } from '../Models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  user: RegisterUser = {
    username: '',
    password: '',
    role: ''
  };

  message: string = '';

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {};

  register (form: any) {
    console.log(form.value);
    console.log("Sending data:", this.user);
    this.userService.register(form.value).subscribe({
      next: (res) => {
        this.message = res.message || "User Registered Successfully!";

        this.user = {
          username: '',
          password: '',
          role: ''
        };
        this.cd.detectChanges();
        console.log(res);
      },
      error: (err) => {
        this.message = err.error?.message ||"Registration failed";
        console.log(err);
      }
    })
  }
}
