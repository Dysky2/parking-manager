import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../assets/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { ParkingSpaceCardComponent } from './components/parking-space-card/parking-space-card.component';
import { ParkingSpace } from '../../core/models/parkingSpace.modal';
import { OnInit } from '@angular/core';
import { ParkingSpaceService } from '../../core/services/parking-space.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [AngularMaterialModule, ParkingSpaceCardComponent, CommonModule, Toast],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.scss',
  providers: [MessageService]
})
export class ParkingComponent implements OnInit {
  parkingSpaces: ParkingSpace[] = [];

  constructor(private parkingSpaceService: ParkingSpaceService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchParkingSpaces();
  }

  refreshPage(event: boolean) {
    if(event) {
      this.fetchParkingSpaces();
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Parking space reserved successfully', life: 2000 });
    }
  }
  
  fetchParkingSpaces() {
    this.parkingSpaceService.getAllParkingSpaces().subscribe(data => {
      this.parkingSpaces = data;
      this.sortParkingSpaces();
    });
  }

  sortParkingSpaces() {
    this.parkingSpaces.sort((a: ParkingSpace, b: ParkingSpace) => {
      return a.parkingSpaceName.localeCompare(b.parkingSpaceName, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }
}
