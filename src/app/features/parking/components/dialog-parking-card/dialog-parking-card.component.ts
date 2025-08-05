import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../../assets/angular-material/angular-material.module';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core'; 
import { SelectModule } from 'primeng/select';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { ParkingSpaceService } from '../../../../core/services/parking-space.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-parking-card',
  standalone: true,
  imports: [
    MatIconModule, 
    FloatLabelModule,
    InputTextModule,
    ButtonModule, 
    CommonModule, 
    FormsModule, 
    AngularMaterialModule,
    ReactiveFormsModule,
    SelectModule
  ],
  templateUrl: './dialog-parking-card.component.html',
  styleUrl: './dialog-parking-card.component.scss'
})

export class DialogParkingCardComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogParkingCardComponent>);
  data = inject(MAT_DIALOG_DATA);

  value: string | undefined;
  form!: FormGroup;
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private parkingSpaceService: ParkingSpaceService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehiclePlate: ['', [
        Validators.maxLength(7), 
        Validators.required, 
        Validators.pattern('/^([A-Z]{2}\s[A-Z0-9]{5})|([A-Z]{3}\s[A-Z0-9]{4})|([A-Z]{2}[A-Z0-9]{5})|([A-Z]{3}[A-Z0-9]{4})$/')
      ]],
      user: ['', Validators.required],
    })

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })

  }

  dialogClose() {
    this.dialogRef.close();
  }

  dialogSubmit() {
    if(this.form.valid) {
      this.parkingSpaceService.changeParkingSpaceStatus(this.data.space.parkingSpaceId, "Reserved", this.form.value.vehiclePlate, this.form.value.user.email).subscribe(() => {
        this._snackBar.open("Parking space reserved successfully", "Close",  {
          duration: 3000
        })
        this.dialogRef.close(true);
      });
    }
  }

}
