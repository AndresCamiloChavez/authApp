import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  formUserLogin: FormGroup = this.formBuilder.group({
    email: new FormControl('test1@email.com', [
      Validators.required,
      Validators.email,
    ]),
    password: ['Clave1234*', [Validators.required]], // hay dos formas
  });

  ngOnInit(): void {}
  onLogin() {
    this.authService
      .login(
        this.formUserLogin.get('email')?.value,
        this.formUserLogin.get('password')?.value
      )
      .subscribe({
        next: (data) => {
          console.log('valor de la data', data);
          console.log('valor del usuario', this.authService.usuario);
          if (data === true) {
            this.router.navigate(['dashboard']);
          } else {
            Swal.fire({
              title: 'Error!',
              text: data,
              icon: 'error',
              confirmButtonText: 'Cool',
            });
          }
        },
        error: (e) => {
          console.log('Ocurrió un error', e);
        },
        complete: () => {
          console.log('Request completada');
        },
      });

    console.log('valor del formulario', this.formUserLogin.value);
  }
}
