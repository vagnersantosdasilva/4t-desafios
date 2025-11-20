import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plano } from '../../model/api.model';

@Injectable({
  providedIn: 'root',
})
export class PlanosService {
   private httpCliente = inject(HttpClient);
  private api = 'http://localhost:3000';

  public getPlanos(): Observable<Plano[]> {
    return this.httpCliente.get<Plano[]>(`${this.api}/planos`);
  }
}
