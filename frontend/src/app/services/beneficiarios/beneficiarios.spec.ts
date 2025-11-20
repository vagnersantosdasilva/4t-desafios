import { TestBed } from '@angular/core/testing';

import { BeneficiariosService } from './beneficiarios';

describe('Beneficiarios', () => {
  let service: BeneficiariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
