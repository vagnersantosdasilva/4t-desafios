import { HttpClient, HttpParams } from '@angular/common/http';
import { Beneficiario, BeneficiarioArgs, BeneficiarioExpanded } from './../../model/api.model';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService {
  private httpCliente = inject(HttpClient);
  private api = 'http://localhost:3000';

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
}
