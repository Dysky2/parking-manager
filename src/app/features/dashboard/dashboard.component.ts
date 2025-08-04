import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';
import { tap } from 'rxjs';
import { User } from '../../core/models/user.model';
import { ParkingSpace } from '../../core/models/parkingSpace.modal';
import { ParkingSpaceService } from '../../core/services/parking-space.service';

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

  constructor(private userService: UserService,
              private parkingSpaceService: ParkingSpaceService) {}

  ngOnInit(): void {
    this.parkingSpaceService.getAllParkingSpaces().subscribe((parkingSpaces) => {
        console.log(parkingSpaces);
        this.activeSessions = parkingSpaces;
    })

    this.parkingSpaceService.getAllParkingSpacesByStatus("Reserved").subscribe((parkingSpaces) => {
      this.reservations = parkingSpaces;
    });

    this.userService.getAllUsers().pipe(
      tap(users => {
        console.log(users[0]);
      })
    ).subscribe();


    this.loading = false;
  }
}
