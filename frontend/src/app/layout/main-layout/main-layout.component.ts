import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavComponent } from '../nav/nav.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, NavComponent, CommonModule, ToastModule, ConfirmDialogModule, SidebarModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isSidebarVisible = false;

toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
