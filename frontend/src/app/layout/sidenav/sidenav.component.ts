import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() isMobile: boolean = false;
  @Output() navLinkClick = new EventEmitter<void>();

  navLinks = [
      { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
      { path: '/parking', icon: 'local_parking', label: 'Parking' },
      { path: '/users', icon: 'group', label: 'Users' },
      { path: '/settings', icon: 'settings', label: 'Settings' },
  ];

  onNavLinkClick() {
    if (this.isMobile) {
      this.navLinkClick.emit();
    }
  }

}
