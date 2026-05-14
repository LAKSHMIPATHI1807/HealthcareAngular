import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getAllDoctors(): Observable<any> {
    return this.http.get("https://doctorapi-bmazacbtbyh3fqaq.centralus-01.azurewebsites.net/HMS/doctors/GetAllDoctors",this.getHeaders());
  }
}
