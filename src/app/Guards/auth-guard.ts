import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

   // Check token exists
  if (!authService.isLoggedIn()) {
    alert('Please login first');
    router.navigateByUrl('');
    return false;
  }

  // Current logged in role
  const userRole = authService.getRole();

  // Allowed roles from route
  const allowedRoles = route.data?.['roles'] as Array<string>;

  // Role validation
  if (allowedRoles && allowedRoles.includes(userRole)) {
    return true;
  }
  alert('Unauthorized Access');

  // Redirect based on role
  if (userRole === 'Admin') {
    router.navigateByUrl('/admin-dashboard');
  }
  else if (userRole === 'Doctor') {
    router.navigateByUrl('/doctor-dashboard');
  }
  else if (userRole === 'Patient') {
    router.navigateByUrl('/patient-dashboard');
  }
  else {
    router.navigateByUrl('');
  }

  return false;
}
