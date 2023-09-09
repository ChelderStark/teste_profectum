import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/shared/services/cadastro/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  hide: boolean = true;

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private messageAlert: MatSnackBar
  ) {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', Validators.required),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  cadastrar() {
    const model = this.criarModelo();
    this.cadastroService.salvarUsuario(model).subscribe({
      next: (resposta) => {
        console.log(resposta);
        this.messageAlert.open('Cadastrado com Sucesso!', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['green-snackbar'],
        });
        this.router.navigateByUrl('/login');
      },
      error: (e) => {
        this.messageAlert.open(`Error ao Cadastrar usuário ${e.error.message[0]}`, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  criarModelo() {
    return {
      name: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      password: this.cadastroForm.get('senha')?.value,
    };
  }
}

// -> login
// http://localhost:3000/api/v1/auth/login
// post:
// {
// name: string,
// email: string,
// }
// payload response:
// {
// access_token: string
// }

// -> salvar usuário
// http://localhost:3000/api/v1/users
// post:
// {
// name: string,
// email: string,
// password: string
// }
// payload response:
// {
// code: string,
// name: string,
// email: string,
// movies_like: number[]
// }

// ->  inserir like
// http://localhost:3000/api/v1/movies
// post:
// {
// code_movie: number
// }
// payload response:
// {
// code: string,
// name: string,
// email: string,
// movies_like: number[]
// }

// -> lista dos filmes mais populares (essa rota get recebe uma query paginada, sempre de 10 itens por página)
// http://localhost:3000/api/v1/movies
// get:
// query:
// {
// page: 1
// itemPerPage: 10
// }
// payload response:
// {
// code: number,
// title: string,
// original_language: string,
// original_title: string,
// overview: string,
// popularity: number,
// poster_path: string, --> path do site onde está o cartaz
// like: boolean,
// like_count: number
// }

// -> lista os filmes por maior qtd de likes (essa rota get recebe uma query paginada, sempre de 10 itens por página)
// http://localhost:3000/api/v1/movies/likes
// get:
// query:
// {
// page: 1
// itemPerPage: 10
// }
// payload response:
// {
// code: number,
// title: string,
// original_language: string,
// original_title: string,
// overview: string,
// popularity: number,
// poster_path: string, --> path do site onde está o cartaz
// like: boolean,
// like_count: number
// }
