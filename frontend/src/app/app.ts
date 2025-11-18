import { Component } from '@angular/core';
import { PartialRoute } from './shared/models/routes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'desafio-frontend';

  public routes :PartialRoute[] =  [
    { path: '', label: 'Home' },
    { path: 'beneficiarios', label: 'Beneficiários' },
    { path: 'planos', label: 'Planos' }
  ];
}
