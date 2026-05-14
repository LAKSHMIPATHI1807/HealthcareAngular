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

  getAllAppointments(): Observable<any> {
    return this.http.get("https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/GetAllAppointments",this.getHeaders());
  }

  getAllDoctors(): Observable<any> {
    return this.http.get("https://doctorapi-bmazacbtbyh3fqaq.centralus-01.azurewebsites.net/HMS/doctors/GetAllDoctors",this.getHeaders());
  }

  getAllPatients(): Observable<any> {
    return this.http.get("https://patientapi-fbdpg4gnc9fdcad5.centralus-01.azurewebsites.net/HMS/patients/GetAllPatients",this.getHeaders());
  }

  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/CancelAppointment/${id}`,{},this.getHeaders());
  }

  completeAppointment(id:number): Observable<any> {
    return this.http.put(`https://appointmentapi-dcazcxgcfdhbb9hu.centralus-01.azurewebsites.net/HMS/appointments/CompleteAppointment/${id}`,{},this.getHeaders());
    
  }
}
