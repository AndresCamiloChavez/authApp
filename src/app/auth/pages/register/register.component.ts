import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  formRegister: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  ngOnInit(): void {}
  onRegister() {
    this.authService
      .register(
        this.formRegister.get('name')?.value,
        this.formRegister.get('email')?.value,
        this.formRegister.get('password')?.value
      )
      .subscribe({
        next: (value) => {
          if (value === true) {
            this.router.navigate(['/dashboard']);
          } else {
            Swal.fire({
              title: 'Error!',
              text: value,
              icon: 'error',
              confirmButtonText: 'Cool',
            });
          }
        },
      });
  }
}
