import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.signupForm.controls; }
  signupProcess() {
    const formdata = new FormData
    formdata.append('username', this.signupForm.get('username')?.value)
    formdata.append('name', this.signupForm.get('name')?.value)
    formdata.append('password', this.signupForm.get('password')?.value)
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    }
    this.loading = true;
    this.authService.register(formdata)
      .subscribe((result: any) => {
        if (result.status == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Account Registered Successfully',
            text: 'Your account has been registered successfully. Please login to continue.'
          }).then(() => {
            this.router.navigate(['/login'])
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Username Already Exists',
            text: 'The username you entered is already registered. Please choose a different username.'
          });
        }
      })
  }
}
