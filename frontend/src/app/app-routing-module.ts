import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },

  {
    path: 'beneficiarios',
    loadChildren: () =>
      import('./pages/beneficiarios/beneficiarios.module')
        .then(m => m.BeneficiariosModule)
  },
  {
    path: 'planos',
    loadChildren: () =>
      import('./pages/planos/planos.module')
        .then(m => m.PlanosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
