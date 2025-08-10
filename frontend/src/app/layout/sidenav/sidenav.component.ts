import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import { Tooltip } from "primeng/tooltip";
import { AuthService } from "../../core/services/auth.service";
import { NavBreadcrumbsService } from '../../core/services/nav-breadcrumbs.service';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, Tooltip],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @Input() isMobile: boolean = false;
  @Output() navLinkClick = new EventEmitter<void>();

  constructor(public authService: AuthService,
              private router: Router, 
              private activatedRoute: ActivatedRoute, 
              private navBreadcrumbsService: NavBreadcrumbsService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
      ).subscribe((data: any) => {
      if (data && data.breadcrumb) {
        this.navBreadcrumbsService.setSelectedPage(data.breadcrumb);
      }
    });
  }

  navLinks = [
      { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', neeToUserLogged: false  },
      { path: '/parking', icon: 'local_parking', label: 'Parking', neeToUserLogged: false  },
      { path: '/users', icon: 'group', label: 'Users', neeToUserLogged: false  },
      { path: '/settings', icon: 'settings', label: 'Settings', neeToUserLogged: true },
  ];

  emitNewPage(pageLabel: string) {
    this.navBreadcrumbsService.setSelectedPage(pageLabel);
  }
}
