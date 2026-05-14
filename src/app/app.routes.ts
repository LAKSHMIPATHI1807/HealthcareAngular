import { Routes, RouterModule } from '@angular/router';
import { Login } from './User/login/login';
import { SignUp } from './User/sign-up/sign-up';
import { AdminDashboard } from './Admin/admin-dashboard/admin-dashboard';
import { DoctorDashboard } from './Doctor/doctor-dashboard/doctor-dashboard';
import { PatientDashboard } from './Patient/patient-dashboard/patient-dashboard';
import { AddPatient } from './Patient/add-patient/add-patient';
import { ViewProfile } from './Patient/view-profile/view-profile';
import { AddDoctor } from './Doctor/add-doctor/add-doctor';
import { ViewDoctorProfile } from './Doctor/view-doctor-profile/view-doctor-profile';
import { MakeAppointment } from './Patient/make-appointment/make-appointment';
import { ViewAppointments } from './Patient/view-appointments/view-appointments';
import { ViewDoctorAppointments } from './Doctor/view-doctor-appointments/view-doctor-appointments';
import { ViewAllAppointments } from './Admin/view-all-appointments/view-all-appointments';
import { ViewDoctors } from './Admin/view-doctors/view-doctors';
import { ViewAllPatients } from './Admin/view-all-patients/view-all-patients';
import { AuthGuard } from './Guards/auth-guard';
import { Main } from './main/main';

export const routes: Routes = [
    {path: '', component: Main},
    {path: 'login', component: Login},
    // {path: "login", component: Login},
    {path: "register", component: SignUp},
     // ADMIN ROUTES
    {
        path: 'admin-dashboard',
        component: AdminDashboard,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'view-doctors',
        component: ViewDoctors,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'view-all-patients',
        component: ViewAllPatients,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'view-all-appointments',
        component: ViewAllAppointments,
        canActivate: [AuthGuard],
        data: { roles: ['Admin'] }
    },

     // DOCTOR ROUTES
    {
        path: 'doctor-dashboard',
        component: DoctorDashboard,
        canActivate: [AuthGuard],
        data: { roles: ['Doctor'] }
    },
    {
        path: 'add-doctor',
        component: AddDoctor,
        canActivate: [AuthGuard],
        data: { roles: ['Doctor'] }
    },
    {
        path: 'view-doctor-profile',
        component: ViewDoctorProfile,
        canActivate: [AuthGuard],
        data: { roles: ['Doctor'] }
    },
    {
        path: 'view-doctor-appointments',
        component: ViewDoctorAppointments,
        canActivate: [AuthGuard],
        data: { roles: ['Doctor'] }
    },
    
    // PATIENT ROUTES
    {
        path: 'patient-dashboard',
        component: PatientDashboard,
        canActivate: [AuthGuard],
        data: { roles: ['Patient'] }
    },
    {
        path: 'add-patient',
        component: AddPatient,
        canActivate: [AuthGuard],
        data: { roles: ['Patient'] }
    },
    {
        path: 'view-profile',
        component: ViewProfile,
        canActivate: [AuthGuard],
        data: { roles: ['Patient'] }
    },
    {
        path: 'make-appointment',
        component: MakeAppointment,
        canActivate: [AuthGuard],
        data: { roles: ['Patient'] }
    },
    {
        path: 'view-appointments',
        component: ViewAppointments,
        canActivate: [AuthGuard],
        data: { roles: ['Patient'] }
    },
    // {path: "admin-dashboard", component: AdminDashboard},
    // {path: "doctor-dashboard", component: DoctorDashboard},
    // {path: "patient-dashboard", component: PatientDashboard},
    // {path: "add-patient", component: AddPatient},
    // {path: "view-profile", component: ViewProfile},
    // {path: "add-doctor", component: AddDoctor},
    // {path: "view-doctor-profile", component: ViewDoctorProfile},
    // {path: "make-appointment", component: MakeAppointment},
    // {path: "view-appointments", component: ViewAppointments},
    // {path: "view-doctor-appointments", component: ViewDoctorAppointments},
    // {path: "view-all-appointments", component: ViewAllAppointments},
    // {path: "view-doctors", component: ViewDoctors},
    // {path: "view-all-patients", component: ViewAllPatients}
    // INVALID ROUTE
    {
        path: '**',
        redirectTo: ''
    }
];
