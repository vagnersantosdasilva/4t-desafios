import { TestBed } from '@angular/core/testing';

import { PlanosService } from './planos';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Plano } from '../../model/api.model';

describe('PlanosService', () => {
  let service: PlanosService;
  let httpMock: HttpTestingController;
  const api = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [PlanosService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlanosService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /planos', () => {
    const mockData: Plano[] = [];

    service.getPlanos().subscribe(response => {
      expect(response).toEqual(mockData);
    });

    const request = httpMock.expectOne(`${api}/planos`);
    expect(request.request.method).toBe('GET');

    request.flush(mockData);
  });

  it('should call POST /beneficiarios with payload', () => {
    const novo: Plano = {
      id: 1,
      nome: 'Master',
      codigo_registro_ans: 'ANS-12345',
    };

    service.savePlano(novo).subscribe(res => {
      expect(res).toEqual(novo);
    });

    const request = httpMock.expectOne(`${api}/planos`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(novo);

    request.flush(novo);
  });

  it('should call PUT /planos/:id with payload', () => {
    const updated: Plano = {
      id: 1,
      nome: 'Updated Plano',
      codigo_registro_ans: 'ANS-54321',
    };

    service.updatePlano(updated).subscribe(res => {
      expect(res).toEqual(updated);
    });

    const request = httpMock.expectOne(`${api}/planos/1`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(updated);
    request.flush(updated);
  });

  it('should call DELETE /planos/:id', () => {
    service.deletePlano(1).subscribe();

    const request = httpMock.expectOne(`${api}/planos/1`);
    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });

});
