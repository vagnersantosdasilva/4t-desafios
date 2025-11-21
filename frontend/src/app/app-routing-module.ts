import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BeneficiariosPage } from './pages/beneficiarios-page/beneficiarios-page';
import { PlanosPage } from './pages/planos-page/planos-page';
import { BeneficiariosFormPage } from './pages/beneficiarios-form-page/beneficiarios-form-page';
import { PlanosFormPage } from './pages/planos-form-page/planos-form-page';

const routes: Routes = [
  {
    path:'',
    component: HomePage
  },
  {
    path: 'beneficiarios',
    children: [
      { path: '', component: BeneficiariosPage },
      { path: 'novo', component: BeneficiariosFormPage },
      { path: 'editar/:id', component: BeneficiariosFormPage },
    ]
  },
  {
    path: 'planos',
    children: [
      { path: '', component: PlanosPage },
      { path: 'novo', component: PlanosFormPage },
      { path: 'editar/:id', component: PlanosFormPage },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
