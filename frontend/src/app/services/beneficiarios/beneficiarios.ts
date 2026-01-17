import { HttpClient, HttpParams } from '@angular/common/http';
import { Beneficiario, BeneficiarioArgs, BeneficiarioExpanded } from './../../model/api.model';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService {
  private httpCliente = inject(HttpClient);
  private api = environment.apiurl

  public getBeneficiarios(beneficiarioArgs?: BeneficiarioArgs): Observable<BeneficiarioExpanded[]> {

    let params = new HttpParams();

    if (beneficiarioArgs) {
      for (const key in beneficiarioArgs) {
        if (beneficiarioArgs.hasOwnProperty(key)) {
          const value = beneficiarioArgs[key as keyof BeneficiarioArgs]; // Assegura que a chave é válida
          if (value !== undefined && value !== null) {
            params = params.append(key, value.toString());
          }
        }
      }
    }
    return this.httpCliente.get<BeneficiarioExpanded[]>(`${this.api}/beneficiarios?_expand=plano`, { params });
  }

  public saveBeneficiario(beneficiario: Beneficiario):Observable<Beneficiario> {
    return this.httpCliente.post<Beneficiario>(`${this.api}/beneficiarios`, beneficiario);
  }

  public updateBeneficiario(beneficiario: Beneficiario):Observable<Beneficiario> {
    return this.httpCliente.put<Beneficiario>(`${this.api}/beneficiarios/${beneficiario.id}`, beneficiario);
  }

  public deleteBeneficiario(id:number):Observable<void> {
    return this.httpCliente.delete<void>(`${this.api}/beneficiarios/${id}`);
  }

  public getBeneficiariosById(id:number):Observable<Beneficiario> {
    return this.httpCliente.get<Beneficiario>(`${this.api}/beneficiarios/${id}`);
  }
}
