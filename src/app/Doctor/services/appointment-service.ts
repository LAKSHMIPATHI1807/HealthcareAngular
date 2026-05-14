import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {};

   private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

   viewDoctorAppointments(id: number): Observable<any> {
    return this.http.get(`http://localhost:5063/HMS/appointments/GetAppointmentsByDoctorId/${id}`)
  }

   cancelAppointment(id: number): Observable<any> {
    return this.http.put(`http://localhost:5063/HMS/appointments/CancelAppointment/${id}`,{},this.getHeaders());
  }

  completeAppointment(id:number): Observable<any> {
    return this.http.put(`http://localhost:5063/HMS/appointments/CompleteAppointment/${id}`,{},this.getHeaders());
    
  }
}
