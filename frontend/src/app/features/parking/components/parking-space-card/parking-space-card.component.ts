import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ParkingSpace } from '../../../../core/models/parkingSpace.modal';
import { MatDialog } from '@angular/material/dialog';
import { DialogParkingCardComponent } from '../dialog-parking-card/dialog-parking-card.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-space-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './parking-space-card.component.html',
  styleUrl: './parking-space-card.component.scss',
})
export class ParkingSpaceCardComponent implements OnInit {
  @Input() space: ParkingSpace | null = null;
  @Output() needToRefresh = new EventEmitter<boolean>();

  private dialog = inject(MatDialog);
  visible: boolean = false;

  ngOnInit(): void {
  }

  onCardClick() {
    if(this.space?.status == 'Available' || this.space?.status == "Occupied") {
      const dialogRef = this.dialog.open(DialogParkingCardComponent, {
        data: {
          space: this.space
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.needToRefresh.emit(true);
        }
      })
    }


  }
}
