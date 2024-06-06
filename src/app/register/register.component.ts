import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../intefaces/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  authForm: FormGroup = {} as FormGroup;
  user: User = {} as User;

  constructor(
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}

  handleSubmit() {
    console.log(this.authForm.valid);
    if (this.authForm.valid) {
      console.log(this.authForm.value);
      this.authService.register(this.authForm.value).subscribe({
        next: (data) => {
          console.log('Đăng ký thành công!', data);
          if (confirm('Đăng ký thành công!')) {
            this.route.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log('Đăng ký thất bại!', err);
          alert(`Đăng ký thất bại!, ${err.error}`);
        },
      });
    } else {
      console.log('form is not valid!');
      console.log(this.authForm.invalid);
      alert('Form is not valid!');
    }
  }
}
