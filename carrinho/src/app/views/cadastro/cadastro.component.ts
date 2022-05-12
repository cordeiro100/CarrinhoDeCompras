import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  nome: string;
  sobrenome: string;
  email: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
    });
  }

  userModel = new User('', '', '', '');

  cadastrar() {
    if (!this.cadastroForm.valid) return;
    const { nome, sobrenome, email, password } = this.cadastroForm.value;
    this.authService
      .cadastro(nome, sobrenome, email, password)
      .pipe(
        this.toast.observe({
          success: 'Cadastro criado com sucesso!',
          loading: 'Carregando cadastro...',
          error: (message) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }
}
