import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../services/doctor-service';
import { Doctor } from '../Models/doctor';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-add-doctor',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-doctor.html',
  styleUrl: './add-doctor.css',
})
export class AddDoctor {
  doctor: Doctor = {
    name: '',
    speicalization: '',
    availableTimeSlot: ''
  };

  message: string = '';

  constructor(private doctorService: DoctorService, private cd: ChangeDetectorRef, private authService: AuthService) {};

  ngOnInit(): void {

    // Auto-fill logged-in username

    const username =
      this.authService.getUsername();

    this.doctor.name = username;

    // this.doctor.userName = username;
  }

  add(form: any) {
    if (form.valid) {
      console.log(form.value);
      this.doctorService.addDoctor(this.doctor).subscribe({
        next: () => {
          this.message = "Doctor added successfully!";
          alert("Doctor added successfully!");

          this.doctor = {
            name: '',
            speicalization: '',
            availableTimeSlot: ''
          };
          this.cd.detectChanges();
        },
        error: (err) => {
          this.message = "Doctor not added!";
          console.log(err);
          console.log('Full Error:', err);
          console.log('Validation Errors:', err.error.errors); 
        }
      })
    }
  }
}
