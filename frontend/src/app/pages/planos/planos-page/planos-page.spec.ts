import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosPage } from './planos-page';
import { DinamicTable } from '../../../shared/components/dinamic-table/dinamic-table';
import { ControlTable } from '../../../shared/components/control-table/control-table';
import { Page } from '../../../shared/components/page/page';
import { of } from 'rxjs';
import { Plano } from '../../../model/api.model';
import { PlanosService } from '../../../services/planos/planos';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialog } from '../../../shared/components/dialog/dialog';

describe('PlanosPage', () => {
  let component: PlanosPage;
  let fixture: ComponentFixture<PlanosPage>;


  let listPlanos: Plano[] = [
    {
      id: 1,
      nome: 'Teste',
      codigo_registro_ans: '10001-001'
    }
  ];

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

  const mockPlanosService = {
    getPlanos: jasmine.createSpy('getPlanos').and.returnValue(
      of([...listPlanos]) // Retorna um Observable com o objeto mockado
    ),
    deletePlano: jasmine.createSpy('deletePlano').and.returnValue(
      of() // Retorna um Observable com o objeto mockado
    ),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanosPage, DinamicTable, ControlTable, Page, Dialog],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: PlanosService, useValue: mockPlanosService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
