import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
 breadcrumbs = {
    parent: 'Pages',
    current: 'Dashboard'
  };

  // Informacje o użytkowniku (można je pobierać z serwisu)
  userName: string = 'Zaloguj się';
}
