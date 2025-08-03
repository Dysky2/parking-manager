import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../assets/angular-material/angular-material.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  AngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'orion';
}
