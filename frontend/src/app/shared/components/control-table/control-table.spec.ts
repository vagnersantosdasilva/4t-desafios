import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTable } from './control-table';

describe('ControlTable', () => {
  let component: ControlTable;
  let fixture: ComponentFixture<ControlTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
