import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../core/services/user.service';
import { tap } from 'rxjs';
import { ParkingSpace } from '../../core/models/parkingSpace.modal';
import { ParkingSpaceService } from '../../core/services/parking-space.service';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule , TableModule, ButtonModule, CommonModule, ConfirmDialog, ToastModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class DashboardComponent implements OnInit {
  activeSessions!: any[];
  selectedSessions: any[] | {} | null = null;
  loading: boolean = true;

  first: number = 0;

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
        console.log(parkingSpaces);
        this.activeSessions = parkingSpaces;
    })

    this.fetchParkingSpacesReservationsTable();

    this.userService.getAllUsers().pipe(
      tap(users => {
        console.log(users[0]);
      })
    ).subscribe();

    this.loading = false;
  }

  acceptReservation(parkingSpaceId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to confirm the selected reservation?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
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
