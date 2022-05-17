import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logar() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logado com sucesso',
          loading: 'Logando...',
          error: 'Email ou senha errado',
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
