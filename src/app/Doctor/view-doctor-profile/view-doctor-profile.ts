import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../services/doctor-service';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-view-doctor-profile',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './view-doctor-profile.html',
  styleUrl: './view-doctor-profile.css',
})
export class ViewDoctorProfile {
  doctor = {
    doctorId: 0,
    name: '',
    speicalization: '',
    availableTimeSlot: ''
  };
  message = '';
  constructor (private doctorService: DoctorService, private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) {};
  isEditMode = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const name = this.authService.getUsername();
    console.log(name);
    this.doctorService.getDoctorByName(name).subscribe({
      next: (res) => {
        console.log(res);
        this.doctor = res;
        console.log(res.availableTimeSlot);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert("Error fetching profile!");
      }
    });
  }
  
  enableEdit() {

    this.isEditMode = true;
  } 

  updatedoctor() {
    this.doctorService.updateDoctor(this.doctor.doctorId, this.doctor).subscribe({
      next: (res) => {
        console.log(res);
        this.message = "Profile updated successfully!";
        alert("Profile updated successfully!");
        this.isEditMode = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert("Error updating details!");
      }
    })
  }
  
  deleteDoctor() {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) {
      return;
    }
    this.doctorService.deleteDoctor(this.doctor.doctorId).subscribe({
      next: (res) => {
        console.log(res);
        alert("Doctor Deleted Successfully!");
        // this.doctor = {
        //   doctorId: 0,
        //   name: '',
        //   speicalization: '',
        //   availableTimeSlot: ''
        // };
        this.router.navigateByUrl("")
      },
      error: (err) => {
        console.log(err);
        alert(err.statusText);
      }
    })
  }
}
