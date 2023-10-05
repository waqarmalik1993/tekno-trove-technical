import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  loggedIn: boolean | undefined;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/user-details']);
    }
  }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }

  LoginProcess() {
    const formdata = new FormData
    formdata.append('username', this.loginForm.get('username')?.value)
    formdata.append('password', this.loginForm.get('password')?.value)
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.loading = true;
    this.authService.login(formdata)
      .subscribe((result: any) => {
        if (result.status == 'success') {
          this.router.navigate(['/user-details'])
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
          Toast.fire({
            icon: 'success',
            iconColor: '#0b5ed7',
            title: result.message
          })
        } if(result.status == 'failed') {
          Swal.fire({ icon: 'error', title: result.message, confirmButtonColor: '#0b5ed7' }).then(() => {
            this.router.navigate(['/register'])
          });
        }
      })


  }
  signup() {
    this.router.navigate(['/signup'])
  }
}

