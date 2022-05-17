import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  name: string;
  sobrenome: string;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
    });
  }

  cadastrar() {
    if (!this.cadastroForm.valid) return;
    const { name, email, password } = this.cadastroForm.value;
    this.authService
      .cadastro(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        ),
        this.toast.observe({
          success: 'Cadastro Realizado',
          loading: 'Carregando cadastro',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
