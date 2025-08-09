import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ParkingSpaceService } from '../../../../core/services/parking-space.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-parking-space',
  standalone: true,
  imports: [MatIcon, ButtonModule, CheckboxModule, CommonModule, ReactiveFormsModule,],
  templateUrl: './dialog-add-parking-space.component.html',
  styleUrl: './dialog-add-parking-space.component.scss'
})
export class DialogAddParkingSpaceComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogAddParkingSpaceComponent>);
  data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;

  constructor(private parkingSpaceService: ParkingSpaceService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      parkingSpaceName: ['', [Validators.required, Validators.pattern(/^[A-Z][0-9]{1,3}$/)]]})
  }

  addParkingSpace() {
    console.log(this.form.value.parkingSpaceName);
    this.parkingSpaceService.addParkingSpace(this.form.value.parkingSpaceName).subscribe(() => {

      this.dialogRef.close(true);
    });
  }

  closeDialog() {
      this.dialogRef.close();
  }
}
