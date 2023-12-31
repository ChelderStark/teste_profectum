import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FilmeService } from 'src/app/shared/services/filme/filme.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss'],
})
export class FilmesComponent implements OnInit {
  filmes: any[] = [];

  ordenarLike: boolean = false;

  usuario = {
    id: 1,
    nome: 'User 1',
  };

  constructor(
    private filmesService: FilmeService,
    private router: Router,
    private messageAlert: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFilmes();
  }

  getFilmes() {
    this.filmesService.listarFilmes().subscribe({
      next: (resposta) => {
        this.filmes = resposta;
      },
      error: (e) => {
        this.messageAlert.open(e.error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  getFilmesLike() {
    this.filmesService.listarFilmesLike().subscribe({
      next: (resposta) => {
        this.filmes = resposta;
      },
      error: (e) => {
        this.messageAlert.open(e.error.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  votar(filme: any) {
    if (!filme.like) {
      this.filmesService.inserirLike({ code_movie: filme.code }).subscribe({
        next: (resposta) => {
          this.ordenar();
        },
        error: (e) => {
          this.messageAlert.open(e.error.message, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['red-snackbar'],
          });
        },
      });
    } else {
      this.messageAlert.open('Já Votado!', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
      });
    }
  }

  ordenar() {
    if (this.ordenarLike) {
      this.getFilmesLike();
    } else {
      this.getFilmes();
    }
  }

  sairConta() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
