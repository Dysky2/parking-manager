import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup  } from '@angular/forms';
import { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
form!: FormGroup;

constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.form = this.fb.group({
    user_id: [''],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })
}


}
