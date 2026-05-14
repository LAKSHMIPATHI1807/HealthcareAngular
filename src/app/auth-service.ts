import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUsername(): string {
    const decoded = this.getDecodedToken();
    return decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
    decoded?.unique_name ||
           decoded?.sub ||
           decoded?.name ||
           '';
  }

  getRole(): string {
    const decoded = this.getDecodedToken();
    return decoded?.role ||
    decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
    '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
