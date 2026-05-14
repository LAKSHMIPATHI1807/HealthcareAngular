import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PatientService } from '../Servicess/patient-service';
import { Patient } from '../Models/patient';

@Component({
  selector: 'app-add-patient',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-patient.html',
  styleUrl: './add-patient.css',
})
export class AddPatient {
  patient: Patient = {
    name: '',
    age: 0,
    gender: '',
    contactNumber: ''
  };

  message: string = '';

  constructor(private patientService: PatientService, private cd: ChangeDetectorRef) {};

  add(form: any) {
    if (form.valid) {
      console.log(form.value);
      this.patientService.addPatient(this.patient).subscribe({
        next: () => {
          this.message = "Patient created successfully!";
          alert("Patient added Successfully!");

          this.patient = {
             name: '',
             age: 0,
             gender: '',
             contactNumber: ''
          };
          this.cd.detectChanges();
        },
        error: (err) => {
          this.message = err, "Patient not added!";
          console.log(err);
        }
      })
    }
  }
}
