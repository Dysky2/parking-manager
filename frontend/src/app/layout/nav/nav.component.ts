import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { ButtonModule } from 'primeng/button';
import  { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import {SidebarModule} from "primeng/sidebar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TabViewModule } from "primeng/tabview";
import { PopoverModule } from 'primeng/popover';
import { BadgeModule } from 'primeng/badge';
import { NavBreadcrumbsService } from '../../core/services/nav-breadcrumbs.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, ButtonModule, MenuModule, SidebarModule, OverlayPanelModule, TabViewModule, PopoverModule, BadgeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

 breadcrumbs = {
    parent: 'Pages',
    current: 'Dashboard'
  };

  isOpen: boolean = false;

  activeTab: string = 'inbox';

  userMenuItems: MenuItem[] = [];

  $currentUser: Observable<User | null>;
  $authStateChecked: Observable<boolean>;

  $currentBreadcrumbs: Observable<string>;

  constructor(private authService: AuthService, private navBreadcrumbsService: NavBreadcrumbsService) {
    this.$currentUser = this.authService.currentUser$;
    this.$authStateChecked = this.authService.authStateChecked$;
    this.$currentBreadcrumbs = this.navBreadcrumbsService.currentPage;
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
        label: 'Logout from profile',
        style: {"padding": "4px"},
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
