import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plano } from '../../model/api.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlanosService {
   private httpCliente = inject(HttpClient);
  private api = environment.apiurl

  public getPlanos(): Observable<Plano[]> {
    return this.httpCliente.get<Plano[]>(`${this.api}/planos`);
  }

  public savePlano(plano:Plano):Observable<Plano> {
    return this.httpCliente.post<Plano>(`${this.api}/planos`, plano);
  }

  public updatePlano(plano:Plano):Observable<Plano> {
    return this.httpCliente.put<Plano>(`${this.api}/planos/${plano.id}`, plano);
  }

  public deletePlano(id:number):Observable<void> {
    return this.httpCliente.delete<void>(`${this.api}/planos/${id}`);
  }

  public getPlanoById(id:number):Observable<Plano> {
    return this.httpCliente.get<Plano>(`${this.api}/planos/${id}`);
  }
}
