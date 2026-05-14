import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {};
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  makeappointment(data:any): Observable<any> {
    return this.http.post("https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/AddAppointment",data,this.getHeaders());
  }

  viewAppointments(patientId: number): Observable<any> {
    return this.http.get(`https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/GetAppointmentsByPatientId/${patientId}`);
  }

  viewDoctorAppointments(id: number): Observable<any> {
    return this.http.get(`https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/GetAppointmentsByDoctorId/${id}`)
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/CancelAppointment/${id}`,{},this.getHeaders());
  }
}
