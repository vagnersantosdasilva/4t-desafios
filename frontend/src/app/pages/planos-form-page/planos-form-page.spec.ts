import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosFormPage } from './planos-form-page';

describe('PlanosFormPage', () => {
  let component: PlanosFormPage;
  let fixture: ComponentFixture<PlanosFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanosFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
