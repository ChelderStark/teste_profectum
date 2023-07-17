import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import Componentes
import { FilmesComponent } from './view/filmes/filmes.component';
import { LoginComponent } from './view/login/login.component';
import { CadastroComponent } from './view/cadastro/cadastro.component';

// Import Gaurds
import { AuthGuard } from './shared/guards/can-active.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'filmes',
    component: FilmesComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: FilmesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
