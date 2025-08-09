import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {SettingService} from "../../core/services/setting.service";
import {Setting} from "../../core/models/setting.modal";

import {ConfirmationService} from "primeng/api";
import {MessageService} from "primeng/api";
import { InputNumberModule  } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule  } from "primeng/floatlabel";
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule} from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import {SelectModule} from "primeng/select";
import { CalendarModule } from "primeng/calendar";
import { TabsModule } from 'primeng/tabs';
import { FluidModule } from 'primeng/fluid';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    TabsModule,
    InputTextModule,
    InputMaskModule,
    FieldsetModule,
    InputNumberModule,
    DatePickerModule,
    FluidModule,
    TabsModule,
    CalendarModule,
    SelectModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  loggedUser: User | null = null;
  settings: Setting | null = null;

  form!: FormGroup;
  passwordForm!: FormGroup;
  settingsForm!: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private settingService: SettingService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchLoggedUser();
    this.fetchAllSettings();

    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    })

    this.settingsForm = this.fb.group({
      totalCapacity: [100],
      reservationBuffer: [15],
      operatingHoursStart: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      operatingHoursEnd: ['', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      pricePerHour: [5.00],
      currency: ['PLN'],
      vat: [23],
      stripePublicKey: [''],
      stripePrivateKey: [''],
      requireDigitPassword: [false],
      requireSpecialCharPassword: [false],
      minLengthPassword: [8],
      failedLoginAttempts: [5]
    });
  }

  fetchLoggedUser() {
    this.authService.getLoggedUser().subscribe({
      next: user => {
        this.loggedUser = user;
      }
    })
  }

  fetchAllSettings() {
    this.settingService.getAllSettings().subscribe({
      next: settings => {
        settings.forEach((setting) => {
          this.settings = setting;
        })
      }
    })
  }

  changeUserInfo() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to change name surname or email?',
      header: 'Confirm',
      accept: () => {

        if (this.form.dirty) {
          const updatedValues: { [key: string]: any} = {};

          Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            if (control && control.dirty && control.value) {
              updatedValues[key] = control.value;
            }
          });

          if (Object.keys(updatedValues).length === 0) {
            return;
          }

          const userToSend: User = {
            ...this.loggedUser,
            ...updatedValues
          } as User;

          this.userService.updateUser(userToSend).subscribe({
            next: user => {
              this.authService.setLoggedInUser(userToSend);
              this.fetchLoggedUser();
              this.messageService.add({severity: 'success', summary: 'User successfully confirmed'});
              this.form.reset();
            },
            error: error => {
              this.messageService.add({severity: 'error', summary: 'something went wrong'});
              console.error(error);
            }
          })
        }
      }
    })
  }

  changePassword() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to change password?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.passwordForm.valid && this.loggedUser?.email) {
          this.userService.updatePassword(
            this.loggedUser?.email,
            this.passwordForm.value.currentPassword,
            this.passwordForm.value.newPassword,
            this.passwordForm.value.confirmNewPassword
          ).subscribe({
            next: (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message
              });
              this.passwordForm.reset();
            },
            error: httpError => {
              console.error(httpError);
              const errorMessage = httpError.error?.message || 'An unknown error occurred.';
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
              });
            }
          });
        }
      }
    })
  }
}
