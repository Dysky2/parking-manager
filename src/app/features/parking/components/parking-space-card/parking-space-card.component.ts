import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ParkingCard } from '../../parkingCard';
import { MatDialog } from '@angular/material/dialog';
import { DialogParkingCardComponent } from '../dialog-parking-card/dialog-parking-card.component';

@Component({
  selector: 'app-parking-space-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './parking-space-card.component.html',
  styleUrl: './parking-space-card.component.scss'
})
export class ParkingSpaceCardComponent {
  @Input() space: ParkingCard | null = null;

  dialog = inject(MatDialog);
  visible: boolean = false;

  onCardClick() {
    if(this.space?.status == "Available" || this.space?.status == "Occupied") {
      this.dialog.open(DialogParkingCardComponent, {
        data: {
          space: this.space
        }
      });
    }
  }
}
