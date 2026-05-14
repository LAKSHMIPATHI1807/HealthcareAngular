import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Patient, ReadPatient } from '../Models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor (private http: HttpClient) {};

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  addPatient(patient: Patient): Observable<any> {
    return this.http.post("https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/AddPatient", patient, this.getHeaders());
  }

  getAllPatients(): Observable<ReadPatient[]> {
    return this.http.get<ReadPatient[]>("https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/GetAllPatients", this.getHeaders());
  }

  getPatientById(id: number): Observable<ReadPatient> {
    return this.http.get<ReadPatient>(`https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/GetPatientById/${id}`,this.getHeaders());
  }

  getPatientByName(name: string): Observable<ReadPatient> {
    return this.http.get<ReadPatient>(`https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/GetPatientByName/${name}`,this.getHeaders());
  }

  updatePatient(id: number, patient: Patient): Observable<any> {
    return this.http.put(`https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/UpdatePatientById/${id}`, patient, this.getHeaders());
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/DeletePatientById/${id}`, this.getHeaders());
  }
}
