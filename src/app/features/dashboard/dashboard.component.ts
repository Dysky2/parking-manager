import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';
import { tap } from 'rxjs';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule , TableModule, ButtonModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  activeSessions!: any[];
  selectedSessions: any[] | {} | null = null;
  loading: boolean = true;

  reservations!: any[];
  selectedReservations: {} | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.activeSessions = [
      {userName: 'adam', parkingPlaceId: 'Bamboo Watch', vehiclePlate: 'Accessories', status: 24},
      {userName: 'adam nowak', parkingPlaceId: 'Black Watch', vehiclePlate: 'Accessories', status: 61},
      {userName: 'xx21vz1fg', parkingPlaceId: 'Blue Band', vehiclePlate: 'Fitness', status: 2},
      {userName: 'z32aa1f4g3', parkingPlaceId: 'Orange Band', vehiclePlate: 'Fitness', status: 5},
      {userName: 'h23a1f4g3', parkingPlaceId: 'Pink Band', vehiclePlate: 'Fitness', status: 40},
      {userName: 'v23a1f4g3', parkingPlaceId: 'Purple Band', vehiclePlate: 'Fitness', status: 12},
      {userName: 'a23a1f4g3', parkingPlaceId: 'Red Band', vehiclePlate: 'Fitness', status: 24},
      {userName: 'b23a1f4g3', parkingPlaceId: 'Yellow Band', vehiclePlate: 'Fitness', status: 18},
      {userName: 'c23a1f4g3', parkingPlaceId: 'Green Band', vehiclePlate: 'Fitness', status: 30},
      {userName: 'd23a1f4g3', parkingPlaceId: 'Black Band', vehiclePlate: 'Fitness', status: 15},
      {userName: 'e23a1f4g3', parkingPlaceId: 'White Band', vehiclePlate: 'Fitness', status: 10},
      {userName: 'f23a1f4g3', parkingPlaceId: 'Gray Band', vehiclePlate: 'Fitness', status: 8},
    ];
    this.reservations = [
      {userName: 'adam', parkingPlaceId: 'Bamboo Watch', vehiclePlate: 'Accessories', status: 'Reserved'},
      {userName: 'adam nowak',parkingPlaceId: 'Black Watch', vehiclePlate: 'Accessories', status: 'Reserved'},
    ]

    this.userService.getAllUsers().pipe(
      tap(users => {
        console.log(users[0]);
      })
    ).subscribe();


    this.loading = false;
  }
}
