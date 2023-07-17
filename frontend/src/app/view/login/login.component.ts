import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shered/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageAlert: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  Cadastro() {
    this.router.navigateByUrl('/cadastro');
  }
  Login() {
    const model = this.criarModelo();
    this.loginService.login(model).subscribe({
      next: (resposta) => {
        localStorage.setItem('isLoggedin', '1');
        console.log(resposta.access_token);
        localStorage.setItem('token', resposta.access_token);
        this.router.navigateByUrl('/filmes');
      },
      error: (e) => {
        this.messageAlert.open(e.error.message[0], 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
        });
      },
    });
  }
  criarModelo() {
    return {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('senha')?.value,
    };
  }
}
