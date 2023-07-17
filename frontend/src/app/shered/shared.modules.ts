import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

const sharedComponents = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
];

@NgModule({
  imports: [CommonModule, ...sharedComponents],
  exports: [CommonModule, ...sharedComponents],
  providers: [],
})
export class SharedModule {}
