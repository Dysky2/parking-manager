import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup  } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UtilitiesModule } from '../../../shared/utilities/utilities.module';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [UtilitiesModule]
})

export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  logIn() {
    this.authService.logIn(this.form.value.email, this.form.value.password);
  }
}
