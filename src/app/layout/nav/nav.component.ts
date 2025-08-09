import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { ButtonModule } from 'primeng/button';
import  { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import {SidebarModule} from "primeng/sidebar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {TabViewModule} from "primeng/tabview";
import { PopoverModule } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, ButtonModule, MenuModule, SidebarModule, OverlayPanelModule, TabViewModule, PopoverModule, BadgeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
 breadcrumbs = {
    parent: 'Pages',
    current: 'Dashboard'
  };

  isOpen: boolean = false;

  activeTab: string = 'inbox';

  tabs = [
    { label: 'Inbox', key: 'inbox' },
    { label: 'General', key: 'general' },
    { label: 'Archived', key: 'archived' }
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  userMenuItems: MenuItem[] = [];

  $currentUser: Observable<User | null>;
  $authStateChecked: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.$currentUser = this.authService.currentUser$;
    this.$authStateChecked = this.authService.authStateChecked$;
  }

  ngOnInit(): void {
    this.fetchUserProfile();
    this.buildUserMenu();
    this.$currentUser = this.authService.currentUser$;
    this.$authStateChecked = this.authService.authStateChecked$;
  }

  fetchUserProfile() {
    if(this.authService.isLoggedIn()) {
      this.$currentUser = this.authService.getLoggedUser();
    }
  }

  toggleNotifications(event: Event): void {
    this.isOpen = !this.isOpen;
  }

buildUserMenu() {
    this.userMenuItems = [
      {
        label: 'Mój Profil',
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
      {
        separator: true
      },
      {
        label: 'Logout from profile',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  logout() {
    this.authService.logOut();
  }
}
