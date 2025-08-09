import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup  } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  createUser() {
    this.userService.isAccountExist(this.form.value.email, this.form.value.password).subscribe((exist) => {
      if(!exist) {
        this.userService.createUser(this.form.value as User).subscribe((user) => {
          this.authService.setToken(user.userId);
          this.messageService.add({ severity: 'info', summary: 'Succes', detail: 'Your account was created', life: 2500 });
          this.authService.setLoggedInUser(user);
          this.router.navigate(["./dashboard"]);
        });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Email or password', detail: 'Email are inused', life: 2000 });
      }
    });
  }

}
