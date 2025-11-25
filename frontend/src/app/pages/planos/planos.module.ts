import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PlanosPage } from './planos-page/planos-page';
import { PlanosFormPage } from './planos-form-page/planos-form-page';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PlanosPage },
  { path: 'novo', component: PlanosFormPage },
  { path: 'editar/:id', component: PlanosFormPage },
];

@NgModule({
  declarations: [PlanosPage, PlanosFormPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PlanosModule {}
