import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariosFormPage } from './beneficiarios-form-page';
import { of } from 'rxjs';
import { Beneficiario } from '../../../model/api.model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { BeneficiariosService } from '../../../services/beneficiarios/beneficiarios';
import { PlanosService } from '../../../services/planos/planos';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

describe('BeneficiariosFormPage', () => {

  @Component({
    selector: 'app-page',
    template: '<ng-content></ng-content>',
  })
  class MockAppPage { }

  let component: BeneficiariosFormPage;
  let fixture: ComponentFixture<BeneficiariosFormPage>;

  let mockBeneficiario: Beneficiario = {
    id: 1,
    nome_completo: 'Teste',
    cpf: '98765432100',
    data_nascimento: '1990-01-01',
    status: 'ATIVO',
    plano_id: 1,
    data_cadastro: '2023-01-01T00:00:00Z',
  };

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

  const mockBeneficiariosService = {
    saveBeneficiario: jasmine.createSpy('saveBeneficiario').and.returnValue(
      of(mockBeneficiario) // Retorna um Observable com o objeto mockado
    ),
    updateBeneficiario: jasmine.createSpy('updateBeneficiario').and.returnValue(
      of(mockBeneficiario) // Retorna um Observable com o objeto mockado
    ),
    getBeneficiariosById: jasmine.createSpy('getBeneficiariosById').and.returnValue(
      of(mockBeneficiario) // Retorna um Observable com o objeto mockado
    ),
  };

  let mockPlanosService = {
    getPlanos: jasmine.createSpy('getPlanos').and.returnValue(
      of([
        {
          "id": 1,
          "nome": "Plano Bronze",
          "codigo_registro_ans": "ANS-100001"
        },
        {
          "id": 2,
          "nome": "Plano Prata",
          "codigo_registro_ans": "ANS-100002"
        },
        {
          "id": 3,
          "nome": "Plano Ouro",
          "codigo_registro_ans": "ANS-100003"
        }
      ]) // Retorna um Observable com uma lista vazia
    ),
  };
  describe('When creating new beneficiario', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BeneficiariosFormPage],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'beneficiarios', component: {} as any },
          ]),
          MockAppPage,
          ReactiveFormsModule,
        ],
        providers: [
          {
            provide: BeneficiariosService,
            useValue: mockBeneficiariosService,
          },
          {
            provide: PlanosService,
            useValue: mockPlanosService,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
          {
            provide: Router,
            useValue: mockRouter,
          }
        ],
      })
        .compileComponents();

      fixture = TestBed.createComponent(BeneficiariosFormPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('sould populate form empty when creating', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.form.value.nomeCompleto).toBe('');
      expect(component.form.value.cpf).toBe('');
      expect(component.form.value.dataNascimento).toBe('');
      expect(component.form.value.planoId).toBe('');
      expect(component.form.value.status).toBe('ATIVO');
    });

    it('should save button disabled when form is pirstine', () => {
      component.ngOnInit();
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;
      const saveButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(saveButton.disabled).toBeTrue();
    });

    it('should save button disabled when form is invalid', () => {
      component.ngOnInit();
      fixture.detectChanges();
      component.form.patchValue({
        nomeCompleto: '',
        cpf: '123',
        dataNascimento: '2020-01-01',
        planoId: '',
        status: 'ATIVO',
      });
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;
      const saveButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(saveButton.disabled).toBeTrue();
    });

    it('should enable save button when form is valid and not pristine', async () => {
      const nome = fixture.nativeElement.querySelector('#nomeCompleto');
      nome.value = mockBeneficiario.nome_completo;
      nome.dispatchEvent(new Event('input'));

      const cpf = fixture.nativeElement.querySelector('#cpf');
      cpf.value = mockBeneficiario.cpf;
      cpf.dispatchEvent(new Event('input'));

      const nasc = fixture.nativeElement.querySelector('#dataNascimento');
      nasc.value = mockBeneficiario.data_nascimento;
      nasc.dispatchEvent(new Event('input'));

      const plano = fixture.nativeElement.querySelector('#plano');
      plano.value = mockBeneficiario.plano_id.toString();
      plano.dispatchEvent(new Event('change'));

      const status = fixture.nativeElement.querySelector('#status');
      status.value = mockBeneficiario.status;
      status.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(component.form.valid).toBeTrue();
      expect(component.form.pristine).toBeFalse();
      expect(saveButton.disabled).toBeFalse();
    });

    it('should cancel button disabled when form is pristine', () => {
      component.ngOnInit();
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;
      const cancelButton = nativeElement.querySelector('#cancel') as HTMLButtonElement;
      expect(cancelButton.disabled).toBeTrue();
    });

    it('should enable cancel button when form is not pristine', async () => {
      const nome = fixture.nativeElement.querySelector('#nomeCompleto');
      nome.value = mockBeneficiario.nome_completo;
      nome.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const cancelButton = fixture.nativeElement.querySelector('#cancel');

      expect(component.form.pristine).toBeFalse();
      expect(cancelButton.disabled).toBeFalse();
    });

    it('should call saveBeneficiario when submitting new beneficiario', async () => {
      const nome = fixture.nativeElement.querySelector('#nomeCompleto');
      nome.value = mockBeneficiario.nome_completo;
      nome.dispatchEvent(new Event('input'));

      const cpf = fixture.nativeElement.querySelector('#cpf');
      cpf.value = mockBeneficiario.cpf;
      cpf.dispatchEvent(new Event('input'));

      const nasc = fixture.nativeElement.querySelector('#dataNascimento');
      nasc.value = mockBeneficiario.data_nascimento;
      nasc.dispatchEvent(new Event('input'));

      const plano = fixture.nativeElement.querySelector('#plano');
      plano.value = mockBeneficiario.plano_id.toString();
      plano.dispatchEvent(new Event('change'));

      const status = fixture.nativeElement.querySelector('#status');
      status.value = mockBeneficiario.status;
      status.dispatchEvent(new Event('change'));

      fixture.detectChanges();

      const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(saveButton).toBeTruthy();
      expect(saveButton.disabled).toBeFalse();

      saveButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const payload = mockBeneficiariosService.saveBeneficiario.calls.mostRecent().args[0];

      expect(payload.nome_completo).toBe(mockBeneficiario.nome_completo);
      expect(payload.cpf).toBe(mockBeneficiario.cpf);
      expect(payload.data_nascimento).toBe(mockBeneficiario.data_nascimento);
      expect(payload.status).toBe(mockBeneficiario.status);
      expect(payload.plano_id).toBe(mockBeneficiario.plano_id.toString());

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/beneficiarios']);

    });

    it('should reset form when cancel button is clicked', async () => {
      const nome = fixture.nativeElement.querySelector('#nomeCompleto');
      nome.value = mockBeneficiario.nome_completo;
      nome.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(component.form.value.nomeCompleto).toBe(mockBeneficiario.nome_completo);

      const cancelButton = fixture.nativeElement.querySelector('#cancel');

      expect(component.form.pristine).toBeFalse();
      expect(cancelButton).toBeTruthy();

      cancelButton.click();
      fixture.detectChanges();

      expect(component.form.pristine).toBeTrue();
      expect(component.form.value.nomeCompleto).toBe(null);
    });
  });

  describe('When editing existing beneficiario', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BeneficiariosFormPage],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'beneficiarios', component: {} as any },
          ]),
          MockAppPage,
          ReactiveFormsModule
        ],
        providers: [
          {
            provide: BeneficiariosService,
            useValue: mockBeneficiariosService,
          },
          {
            provide: PlanosService,
            useValue: mockPlanosService,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRouteWithId,
          },
        ],
      })
        .compileComponents();

      fixture = TestBed.createComponent(BeneficiariosFormPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('sould populate form when editing', () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.form.value.nomeCompleto).toBe(mockBeneficiario.nome_completo);
      expect(component.form.value.cpf).toBe(mockBeneficiario.cpf);
      expect(component.form.value.dataNascimento).toBe(mockBeneficiario.data_nascimento);
      expect(component.form.value.planoId).toBe(mockBeneficiario.plano_id);
      expect(component.form.value.status).toBe(mockBeneficiario.status);
      expect(component.form.value.dataCadastro).toBe(mockBeneficiario.data_cadastro.substring(0, 16));
    });

    it('should call updateBeneficiario when submitting edited beneficiario', async () => {
      const nome = fixture.nativeElement.querySelector('#nomeCompleto');
      nome.value = mockBeneficiario.nome_completo;
      nome.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(saveButton).toBeTruthy();
      expect(saveButton.disabled).toBeFalse();

      saveButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const payload = mockBeneficiariosService.updateBeneficiario.calls.mostRecent().args[0];

      expect(payload.nome_completo).toBe(mockBeneficiario.nome_completo);
      expect(payload.cpf).toBe(mockBeneficiario.cpf);
      expect(payload.data_nascimento).toBe(mockBeneficiario.data_nascimento);
      expect(payload.status).toBe(mockBeneficiario.status);
      expect(payload.plano_id).toBe(mockBeneficiario.plano_id);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/beneficiarios']);
    });

  });

});
