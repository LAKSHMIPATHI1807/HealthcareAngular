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
    return this.http.post("http://localhost:5063/HMS/appointments/AddAppointment",data,this.getHeaders());
  }

  viewAppointments(patientId: number): Observable<any> {
    return this.http.get(`http://localhost:5063/HMS/appointments/GetAppointmentsByPatientId/${patientId}`);
  }

  viewDoctorAppointments(id: number): Observable<any> {
    return this.http.get(`http://localhost:5063/HMS/appointments/GetAppointmentsByDoctorId/${id}`)
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`http://localhost:5063/HMS/appointments/CancelAppointment/${id}`,{},this.getHeaders());
  }
}
