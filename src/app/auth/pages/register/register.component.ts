import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }
  formRegister: FormGroup = this.formBuilder.group({
    'name': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(7)]],
  })

  ngOnInit(): void {
  }
  onRegister(){
    this.router.navigate(['dashboard']);
    console.log('Usuario a registrar', this.formRegister.value);
    
  }

}
