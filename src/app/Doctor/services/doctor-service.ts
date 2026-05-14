import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, ReadDoctor } from '../Models/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {};

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  addDoctor(doctor: Doctor): Observable<any> {
    return this.http.post("http://localhost:5063/HMS/doctors/AddDoctor",doctor, this.getHeaders());
  }

  getAllDoctors(): Observable<ReadDoctor[]> {
    return this.http.get<ReadDoctor[]>("http://localhost:5063/HMS/doctors/GetAllDoctors", this.getHeaders());
  }

  getDoctorById(id: number): Observable<ReadDoctor> {
    return this.http.get<ReadDoctor>(`http://localhost:5063/HMS/doctors/GetDoctorById/${id}`,this.getHeaders());
  }

  getDoctorByName(name: string): Observable<ReadDoctor> {
    return this.http.get<ReadDoctor>(`http://localhost:5063/HMS/doctors/GetDoctorByName/${name}`,this.getHeaders());
  }

  updateDoctor(id: number, doctor: Doctor): Observable<any> {
    return this.http.put(`http://localhost:5063/HMS/doctors/UpdateDoctorById/${id}`,doctor,this.getHeaders())
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5063/HMS/doctors/DeleteDoctorById/${id}`, this.getHeaders());
  }
}
