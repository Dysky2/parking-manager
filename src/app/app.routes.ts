import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', 
        component: MainLayoutComponent, 
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Przekierowanie domyślne
            { path: 'dashboard', component: DashboardComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
