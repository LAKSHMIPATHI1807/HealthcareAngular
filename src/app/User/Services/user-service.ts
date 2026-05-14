import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser,RegisterUser,LoginResponse } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {};
  register(data: RegisterUser): Observable<any> {
    return this.http.post("http://localhost:5063/HMS/users/register",data)
  }

  login(data: LoginUser) {
    return this.http.post<LoginResponse>("http://localhost:5063/HMS/users/login",data)
  }
}
