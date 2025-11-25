import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariosPage } from './beneficiarios-page';
import { RouterTestingModule } from '@angular/router/testing';
import { BeneficiarioExpanded, Plano } from '../../../model/api.model';
import { DinamicTable } from '../../../shared/components/dinamic-table/dinamic-table';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanosService } from '../../../services/planos/planos';
import { BeneficiariosService } from '../../../services/beneficiarios/beneficiarios';
import { Page } from '../../../shared/components/page/page';
import { Dialog } from '../../../shared/components/dialog/dialog';
import { ControlTable } from '../../../shared/components/control-table/control-table';

describe('BeneficiariosPage', () => {
  let component: BeneficiariosPage;
  let fixture: ComponentFixture<BeneficiariosPage>;

  const listBeneficiarios: BeneficiarioExpanded[] = [
    {
      id: 1,
      nome_completo: 'João Silva',
      cpf: '12345678900',
      data_nascimento: '1990-01-01',
      status: 'ATIVO',
      plano_id: 1,
      data_cadastro: '2025-02-15T11:00:00Z',
      plano: {
        id: 1,
        nome: 'Plano Básico',
        codigo_registro_ans: 'ANS-0001'
      }
    },
    {
      id: 2,
      nome_completo: "Ana Souza",
      cpf: "98765432100",
      data_nascimento: "1995-09-03",
      status: "ATIVO",
      plano_id: 1,
      data_cadastro: '2025-02-15T11:00:00Z',
      plano: {
        id: 2,
        nome: 'Plano Premium',
        codigo_registro_ans: 'ANS-0002'
      }
    },

  ];
  const mockBeneficiariosService = {
    getBeneficiarios: jasmine.createSpy('getBeneficiarios').and.returnValue(of([
      ...listBeneficiarios
    ])),
    deleteBeneficiario: jasmine.createSpy('deleteBeneficiario').and.returnValue(of())
  }

  const listaPlanos: Plano[] = [
    { id: 1, nome: 'Plano Básico', codigo_registro_ans: 'ANS-0001' },
    { id: 2, nome: 'Plano Premium', codigo_registro_ans: 'ANS-0002' },
  ];

  const mockPlanoService = {
    getPlanos: jasmine.createSpy('getPlanos').and.returnValue(of([
      ...listaPlanos
    ]))
  }

  const mockActivatedRouteWithId = {

    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1' : null),
      },
    },
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => null,
      },
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiariosPage, DinamicTable, Page, Dialog, ControlTable],
      imports: [RouterTestingModule.withRoutes([
        { path: 'beneficiarios', component: {} as any },
      ]),],
      providers: [
        { provide: BeneficiariosService, useValue: mockBeneficiariosService },
        { provide: PlanosService, useValue: mockPlanoService },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: Router,
          useValue: mockRouter,
        }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BeneficiariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load beneficiarios on init', () => {
    expect(mockBeneficiariosService.getBeneficiarios).toHaveBeenCalled();
  });
});
