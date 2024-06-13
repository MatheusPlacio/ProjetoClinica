import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginCard = true;

  loginForm: FormGroup;
  criarContaForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cookieService: CookieService,
              private messageService: MessageService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, this.emailValidator]],
        password: ['', Validators.required]
    });

    this.criarContaForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegexp.test(control.value) ? null : { invalidEmail: true };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;
    return password.value !== confirmPassword.value ? { mismatch: true } : null;
  }

  onSubmitLoginForm(): void {
    if (this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value)
        .subscribe({
          next: (response) => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem Vindo de volta ${response?.name}!`,
                life: 4000,
              });
            }
          },
          error: (err) => {
            const errors = err.error?.mensagens || ['Erro ao fazer o login!'];
            errors.forEach((msg: string) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: msg,
                life: 4000,
              });
            });
            console.log(err);
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente.',
        life: 4000,
      });
    }
  }

  onSubmitCriarContaForm(): void {
    if (this.criarContaForm.valid) {
      this.userService.CriarUsuario(this.criarContaForm.value)
        .subscribe({
          next: (response) => {
            if (response) {
              this.criarContaForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário criado com sucesso!`,
                life: 4000,
              });
            }
          },
          error: (err) => {
            // Captura as mensagens de erro do backend e as exibe no toast
            const errorMessage = err.error?.mensagem || 'Erro ao criar conta!';
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: errorMessage,
              life: 4000,
            });
            console.log(err);
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos corretamente.',
        life: 4000,
      });
    }
  }


}
