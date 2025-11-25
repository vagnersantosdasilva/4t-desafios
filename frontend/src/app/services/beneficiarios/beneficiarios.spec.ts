import { TestBed } from '@angular/core/testing';

import { BeneficiariosService } from './beneficiarios';
import { Beneficiario, BeneficiarioArgs, BeneficiarioExpanded } from '../../model/api.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('BeneficiariosService', () => {
  let service: BeneficiariosService;
  let httpMock: HttpTestingController;

  const api = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeneficiariosService]
    });

    service = TestBed.inject(BeneficiariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should call GET /beneficiarios', () => {
    const mockData: BeneficiarioExpanded[] = [];

    service.getBeneficiarios().subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const request = httpMock.expectOne(`${api}/beneficiarios?_expand=plano`);
    expect(request.request.method).toBe('GET');

    request.flush(mockData);
  });


  it('should append query params when BeneficiarioArgs is provided', () => {
    const mockArgs = {
      status: 'ATIVO',
      plano_id: 1
    } as BeneficiarioArgs;

    service.getBeneficiarios(mockArgs).subscribe();

    const request = httpMock.expectOne(
      `${api}/beneficiarios?_expand=plano&status=ATIVO&plano_id=1`
    );

    expect(request.request.method).toBe('GET');
    request.flush([]);
  });


  it('should call POST /beneficiarios with payload', () => {
    const novo: Beneficiario = {
      id: 0,
      nome_completo: 'João',
      cpf: '09591525710',
      data_nascimento: '1990-01-01',
      plano_id: 1,
      status: 'ATIVO',
      data_cadastro: '2025-02-15T11:00:00Z'
    };

    service.saveBeneficiario(novo).subscribe(res => {
      expect(res).toEqual(novo);
    });

    const request = httpMock.expectOne(`${api}/beneficiarios`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(novo);

    request.flush(novo);
  });


  it('should call PUT /beneficiarios/:id with payload', () => {
    const updated = {
      id: 5,
      nome_completo: 'Ana',
      cpf: '09591525710',
      data_nascimento: '1980-01-01',
      plano_id: 2,
      status: 'ATIVO',
      data_cadastro: '2025-02-15T11:00:00Z'
    } as Beneficiario;

    service.updateBeneficiario(updated).subscribe();

    const request = httpMock.expectOne(`${api}/beneficiarios/5`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(updated);

    request.flush(updated);
  });


  it('should call DELETE /beneficiarios/:id', () => {
    service.deleteBeneficiario(10).subscribe();

    const request = httpMock.expectOne(`${api}/beneficiarios/10`);
    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });


  it('should call GET /beneficiarios/:id', () => {
    const mockBeneficiario: Beneficiario = {
      id: 1,
      nome_completo: 'Teste',
      cpf: '09591525710',
      data_nascimento: '1990-01-01',
      status: 'ATIVO',
      plano_id: 1,
      data_cadastro: '2025-02-15T11:00:00Z'
    };

    service.getBeneficiariosById(1).subscribe(res => {
      expect(res).toEqual(mockBeneficiario);
    });

    const req = httpMock.expectOne(`${api}/beneficiarios/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockBeneficiario);
  });

});
