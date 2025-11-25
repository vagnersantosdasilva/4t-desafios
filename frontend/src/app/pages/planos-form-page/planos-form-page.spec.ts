import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosFormPage } from './planos-form-page';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PlanosService } from '../../services/planos/planos';
import { ActivatedRoute, Router } from '@angular/router';
import { Plano } from '../../model/api.model';

describe('PlanosFormPage', () => {

  @Component({
    selector: 'app-page',
    template: '<ng-content></ng-content>',
  })
  class MockAppPage { }

  let component: PlanosFormPage;
  let fixture: ComponentFixture<PlanosFormPage>;


  let mockPlano: Plano = {
    id: 1,
    nome: 'Teste',
    codigo_registro_ans: '10001-001'
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

  const mockPlanosService = {
    savePlano: jasmine.createSpy('savePlano').and.returnValue(
      of(mockPlano) // Retorna um Observable com o objeto mockado
    ),
    updatePlano: jasmine.createSpy('updatePlano').and.returnValue(
      of(mockPlano) // Retorna um Observable com o objeto mockado
    ),
    getPlanoById: jasmine.createSpy('getPlanoById').and.returnValue(
      of(mockPlano) // Retorna um Observable com o objeto mockado
    ),
  };

  describe('When creating new plano', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PlanosFormPage],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'planos', component: {} as any },
          ]),
          MockAppPage,
          ReactiveFormsModule,
        ],
        providers: [
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

      fixture = TestBed.createComponent(PlanosFormPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('sould populate form empty when creating', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.form.value.nome).toBe('');
      expect(component.form.value.codigoRegistroAns).toBe('');
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
        nome: '',
        codigoRegistroAns: '123',

      });
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;
      const saveButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(saveButton.disabled).toBeTrue();
    });

    it('should enable save button when form is valid and not pristine', async () => {
      const nome = fixture.nativeElement.querySelector('#nome');
      nome.value = mockPlano.nome;
      nome.dispatchEvent(new Event('input'));

      const codigoAns = fixture.nativeElement.querySelector('#codigoRegistroAns');
      codigoAns.value = mockPlano.codigo_registro_ans;
      codigoAns.dispatchEvent(new Event('input'));

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
      const nome = fixture.nativeElement.querySelector('#nome');
      nome.value = mockPlano.nome;
      nome.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const cancelButton = fixture.nativeElement.querySelector('#cancel');

      expect(component.form.pristine).toBeFalse();
      expect(cancelButton.disabled).toBeFalse();
    });

    it('should call savePlano when submitting new plano', async () => {
      const nome = fixture.nativeElement.querySelector('#nome');
      nome.value = mockPlano.nome;
      nome.dispatchEvent(new Event('input'));

      const codigoAns = fixture.nativeElement.querySelector('#codigoRegistroAns');
      codigoAns.value = mockPlano.codigo_registro_ans;
      codigoAns.dispatchEvent(new Event('input'));

      console.log('Form valido:', component.form.valid);
      console.log('Erros ', component.form.errors);

      fixture.detectChanges();

      const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(saveButton).toBeTruthy();
      expect(saveButton.disabled).toBeFalse();

      saveButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const payload = mockPlanosService.savePlano.calls.mostRecent().args[0];

      expect(payload.nome).toBe(mockPlano.nome);
      expect(payload.codigo_registro_ans).toBe(mockPlano.codigo_registro_ans);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/planos']);
    });


    it('should reset form when cancel button is clicked', async () => {
      const nome = fixture.nativeElement.querySelector('#nome');
      nome.value = mockPlano.nome;
      nome.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(component.form.value.nome).toBe(mockPlano.nome);

      const cancelButton = fixture.nativeElement.querySelector('#cancel');

      expect(component.form.pristine).toBeFalse();
      expect(cancelButton).toBeTruthy();

      cancelButton.click();
      fixture.detectChanges();

      expect(component.form.pristine).toBeTrue();
      expect(component.form.value.nome).toBe(null);
    });

  });

  describe('When editing existing Plano', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PlanosFormPage],
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'Planos', component: {} as any },
          ]),
          MockAppPage,
          ReactiveFormsModule
        ],
        providers: [
          {
            provide: PlanosService,
            useValue: mockPlanosService,
          },
          {
            provide: PlanosService,
            useValue: mockPlanosService,
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRouteWithId,
          },
          {
            provide: Router,
            useValue: mockRouter,
          }
        ],
      })
        .compileComponents();

      fixture = TestBed.createComponent(PlanosFormPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('sould populate form when editing', () => {
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.form.value.nome).toBe(mockPlano.nome);
      expect(component.form.value.codigoRegistroAns).toBe(mockPlano.codigo_registro_ans);
    });

    it('should call updatePlano when submitting edited Plano', async () => {
      const nome = fixture.nativeElement.querySelector('#nome');
      nome.value = mockPlano.nome;
      nome.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');

      expect(saveButton).toBeTruthy();
      expect(saveButton.disabled).toBeFalse();

      saveButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const payload = mockPlanosService.updatePlano.calls.mostRecent().args[0];

      expect(payload.nome).toBe(mockPlano.nome);
      expect(payload.codigo_registro_ans).toBe(mockPlano.codigo_registro_ans);


      expect(mockRouter.navigate).toHaveBeenCalledWith(['/planos']);
    });

  });

});




