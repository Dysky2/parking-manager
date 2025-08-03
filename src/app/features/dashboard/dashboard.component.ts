import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule , TableModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  products!: any[];
  selectedProducts: {} | null = null;

  loading: boolean = true;

  ngOnInit(): void {
    this.products = [
      {code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24},
      {code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 61},
      {code: 'xx21vz1fg', name: 'Blue Band', category: 'Fitness', quantity: 2},
      {code: 'z32aa1f4g3', name: 'Orange Band', category: 'Fitness', quantity: 5},
      {code: 'h23a1f4g3', name: 'Pink Band', category: 'Fitness', quantity: 40},
      {code: 'v23a1f4g3', name: 'Purple Band', category: 'Fitness', quantity: 12},
      {code: 'a23a1f4g3', name: 'Red Band', category: 'Fitness', quantity: 24},
      {code: 'b23a1f4g3', name: 'Yellow Band', category: 'Fitness', quantity: 18},
      {code: 'c23a1f4g3', name: 'Green Band', category: 'Fitness', quantity: 30},
      {code: 'd23a1f4g3', name: 'Black Band', category: 'Fitness', quantity: 15},
      {code: 'e23a1f4g3', name: 'White Band', category: 'Fitness', quantity: 10},
      {code: 'f23a1f4g3', name: 'Gray Band', category: 'Fitness', quantity: 8},
    ];
    this.loading = false;
  }
}
