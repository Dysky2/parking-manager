import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from "../../../../core/services/auth.service";
import { Tooltip } from "primeng/tooltip";
import { MatDialog } from '@angular/material/dialog';
import {DialogAddUserComponent} from "../dialog-add-user/dialog-add-user.component";
import {InputText} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,
    MenuModule, SelectModule, AccordionModule, CalendarModule,
    MultiSelectModule, SelectButtonModule, Tooltip, InputText, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];

  bulkActionItems: MenuItem[] = [];

  isAdminLogged: boolean = false;

  private dialog = inject(MatDialog);

  roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' }
  ];

  constructor(private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.fetchUserData();

    this.authService.getLoggedUser().subscribe({
      next: (users) => {
        if(users?.role === "Admin") {
          this.isAdminLogged = true;
        }
      }
    })

    this.bulkActionItems = [
        {
          label: 'Delete Selected',
          icon: 'pi pi-trash',
          command: () => {
            this.confirmationService.confirm({
              message: 'Do you want to delete this records?',
              header: 'Danger Zone',
              icon: 'pi pi-info-circle',
              rejectLabel: 'Cancel',
              rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
              },
              acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
              },
              accept: () => {
                this.authService.getLoggedUser().subscribe({
                  next: (loggedUser) => {
                    this.selectedUsers.forEach((user) => {
                      this.deleteUserIfNotAdmin(loggedUser, user);
                    })
                  }
                })
              },
              reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              },
            })
          }
        },
    ];
  }

  fetchUserData() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    })
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.fetchUserData();
      }
    })
  }

  onRowEditSave(user: User) {
    this.userService.updateUser(user).subscribe();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated' });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.authService.getLoggedUser().subscribe({
          next: (loggedUser) => {
            this.deleteUserIfNotAdmin(loggedUser, user);
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    })
  }

  deleteUserIfNotAdmin(loggedUser: User | null, user: User) {
    if(loggedUser?.userId != user.userId) {
      this.userService.deleteUser(user.userId).subscribe({
        next: () => {
          this.fetchUserData();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You try to delete logged user' });
    }
  }
}
