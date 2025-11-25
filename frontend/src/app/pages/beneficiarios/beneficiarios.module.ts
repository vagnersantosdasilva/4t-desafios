import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BeneficiariosPage } from './beneficiarios-page/beneficiarios-page';
import { BeneficiariosFormPage } from './beneficiarios-form-page/beneficiarios-form-page';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: BeneficiariosPage },
  { path: 'novo', component: BeneficiariosFormPage },
  { path: 'editar/:id', component: BeneficiariosFormPage },
];

@NgModule({
  declarations: [BeneficiariosPage, BeneficiariosFormPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BeneficiariosModule {}
