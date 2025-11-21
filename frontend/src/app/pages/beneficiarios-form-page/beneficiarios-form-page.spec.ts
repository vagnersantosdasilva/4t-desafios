import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariosFormPage } from './beneficiarios-form-page';

describe('BeneficiariosFormPage', () => {
  let component: BeneficiariosFormPage;
  let fixture: ComponentFixture<BeneficiariosFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiariosFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiariosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
