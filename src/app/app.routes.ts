import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ParkingComponent } from './features/parking/parking.component';
import { UserComponent } from './features/users/components/user/user.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
    {
        path: '', 
        component: MainLayoutComponent, 
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent},
            { path: 'parking', component: ParkingComponent},
            { path: 'users', component: UserComponent},
            { path: 'settings', component: SettingsComponent}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
