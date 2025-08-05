import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';
import { ParkingSpace } from '../../core/models/parkingSpace.modal';
import { ParkingSpaceService } from '../../core/services/parking-space.service';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule , TableModule, ButtonModule, SelectModule, TagModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent implements OnInit {
  activeSessions!: any[];
  selectedSessions: any[] | {} | null = null;
  loading: boolean = true;

  numberOfAllParkingSpaces: number = 0;
  numberOfAvailableParkingSpaces: number = 0;
  numberOfOccupiedParkingSpaces: number = 0;
  percentOfOccupiedPlaces: number = 0; 

  first: number = 0;
  statuses!: any[];
  reservations!: ParkingSpace[];
  selectedReservations: {} | null = null;

  constructor(private userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private parkingSpaceService: ParkingSpaceService) {}

  fetchParkingSpacesReservationsTable() {
    this.parkingSpaceService.getAllParkingSpacesByStatus("Reserved").subscribe((parkingSpaces) => {
      this.reservations = parkingSpaces;
    });
  }

  ngOnInit(): void {
    this.parkingSpaceService.getAllParkingSpaces().subscribe((parkingSpaces) => {
        this.activeSessions = parkingSpaces;
    })

    this.parkingSpaceService.getNumberOfParkingSpaces().subscribe((countsOfParkingSpaces) => {
      this.numberOfAllParkingSpaces = countsOfParkingSpaces;
    })

    this.parkingSpaceService.getNumberOfParkingSpacesByStatus("Available").subscribe((countsOfParkingSpaces) => {
      this.numberOfAvailableParkingSpaces = countsOfParkingSpaces;
    })

    this.parkingSpaceService.getNumberOfParkingSpacesByStatus("Occupied").subscribe((countsOfParkingSpaces) => {
      this.numberOfOccupiedParkingSpaces = countsOfParkingSpaces;

      if(this.numberOfAllParkingSpaces > 0) {
        this.percentOfOccupiedPlaces = (this.numberOfOccupiedParkingSpaces / this.numberOfAllParkingSpaces) * 100;
      } else {
        this.percentOfOccupiedPlaces = 0;
      }
    })


    this.fetchParkingSpacesReservationsTable();

    this.loading = false;

    this.statuses = [
      { label: 'Available', value: 'Available' },
      { label: 'Occupied', value: 'Occupied' },
      { label: 'Reserved', value: 'Reserved' },
      { label: 'Maintenance', value: 'Maintenance' }
    ]
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Occupied': return 'danger';
      case 'Available': return 'success';
      case 'Reserved': return 'warn';
      case 'Maintenance': return 'info';
      default: return 'info';
    }
  }

  acceptReservation(parkingSpaceId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to confirm the selected reservation?',
        header: 'Confirm',
        accept: () => {
            this.parkingSpaceService.changeParkingSpaceStatus(parkingSpaceId, "Occupied").subscribe( () => {
                this.fetchParkingSpacesReservationsTable();
            });
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Reservation confirmed' });
        }
    });
  }

  deleteReservation(parkingSpaceId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected reservation?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.parkingSpaceService.changeParkingSpaceStatus(parkingSpaceId, "Available").subscribe( () => {
              this.fetchParkingSpacesReservationsTable();
            });
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Reservation deleted' });
        }
    });
  }

}
