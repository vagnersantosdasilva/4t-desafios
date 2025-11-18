import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { BeneficiariosPage } from './pages/beneficiarios-page/beneficiarios-page';
import { PlanosPage } from './pages/planos-page/planos-page';

const routes: Routes = [
  {
    path:'',
    component: HomePage
  },
  {
    path: 'beneficiarios',
    component: BeneficiariosPage, // Componente que mostra a lista
  },
  {
    path:'planos',
    component:PlanosPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
