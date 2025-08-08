import { Component, inject, OnInit } from '@angular/core';

import { FloatLabelModule } from "primeng/floatlabel";
import { SelectModule } from "primeng/select";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { InputTextModule } from "primeng/inputtext";

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../../../../core/services/user.service";
import { User } from "../../../../core/models/user.model";
import {InputText} from "primeng/inputtext";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    InputText,
    MatIcon
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);
  data = inject(MAT_DIALOG_DATA);

  form!: FormGroup;
  roles: any[] = [];

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.roles = [
      {name: "User", value: "User"},
      {name: "Admin", value: "Admin"},
    ];

    this.form = this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      role: [null , Validators.required]
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    const formValue = this.form.value;
    const valueToSend: User = {
      ...formValue,
      role: formValue.role.name
    }

    this.userService.createUser(valueToSend).subscribe({
      next: (user) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error("Failed to create user", err);
      }
    })
  }
}
