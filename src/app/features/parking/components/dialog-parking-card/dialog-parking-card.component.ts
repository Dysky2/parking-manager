import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../../assets/angular-material/angular-material.module';

@Component({
  selector: 'app-dialog-parking-card',
  standalone: true,
  imports: [MatIconModule, FloatLabelModule,InputTextModule,ButtonModule, CommonModule, FormsModule, AngularMaterialModule],
  templateUrl: './dialog-parking-card.component.html',
  styleUrl: './dialog-parking-card.component.scss'
})

export class DialogParkingCardComponent {
  readonly dialogRef = inject(MatDialogRef<DialogParkingCardComponent>);
  data = inject(MAT_DIALOG_DATA);

  value: string | undefined;

  dialogClose() {
    this.dialogRef.close();
  }
}
