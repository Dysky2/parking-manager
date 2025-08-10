import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ParkingComponent } from './features/parking/parking.component';
import { UserComponent } from './features/users/components/user/user.component';
import { SettingsComponent } from './features/settings/settings.component';
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { 
                path: 'dashboard', 
                component: DashboardComponent, 
                data: {breadcrumb: 'Dashboard'}
            },
            { 
                path: 'parking', 
                component: ParkingComponent,
                data: {breadcrumb: 'Parking'}
            },
            { 
                path: 'users', 
                component: UserComponent, 
                data: {breadcrumb: 'Users'}
            },
            { 
                path: 'settings', 
                component: SettingsComponent,
                data: {breadcrumb: 'Settings'}, 
                canActivate: [authGuard], 
            }
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
