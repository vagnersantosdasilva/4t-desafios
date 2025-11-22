import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DinamicTable } from './dinamic-table';
import { ControlTable } from '../control-table/control-table';
import { SelectOption, TableColumn, TableDataRow } from '../../models/table.model';
import { By } from '@angular/platform-browser';

describe('DinamicTable', () => {
  let component: DinamicTable;
  let fixture: ComponentFixture<DinamicTable>;

  const mockTableHeader: TableColumn[] = [
    { header: 'ID', field: 'id', isSortable: true },
    { header: 'Nome Completo', field: 'nome_completo', isSortable: true },
    { header: 'CPF', field: 'cpf' },
    { header: 'Data Nasc.', field: 'data_nascimento', pipe: 'date', format: 'dd/MM/yyyy' },
    { header: 'Status', field: 'status' },
    { header: 'Plano', field: 'plano', isSortable: true },
    { header: 'Data Cadastro', field: 'data_cadastro', pipe: 'date', format: 'dd/MM/yyyy HH:mm' }
  ];

  const mockTableDataEmpty: TableDataRow[] = [];

  const mockTableData: TableDataRow[] = [
    { id: 1, nome_completo: 'João Silva', cpf: '123.456.789-00', data_nascimento: new Date(1990, 1, 1), status: 'ATIVO', plano: 'Premium', data_cadastro: new Date(2022, 5, 15, 10, 30) },
    { id: 2, nome_completo: 'Maria Oliveira', cpf: '987.654.321-00', data_nascimento: new Date(1985, 6, 20), status: 'INATIVO', plano: 'Básico', data_cadastro: new Date(2021, 3, 10, 14, 45) }
  ];

  const mockPlanosOptions: SelectOption[] = [
    { id: 1, label: 'Básico', value: 'basico' },
    { id: 2, label: 'Premium', value: 'premium' },
    { id: 3, label: 'Corporativo', value: 'corporativo' }
  ];

  const mockStatusOptions: SelectOption[] = [
    { id: 1, label: 'Todos', value: 'todos' },
    { id: 2, label: 'Ativo', value: 'ativo' },
    { id: 3, label: 'Inativo', value: 'inativo' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinamicTable, ControlTable]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DinamicTable);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    //component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show custom empty table message when data is empty', () => {
    const customMessage = 'Não há dados no momento.';

    fixture.componentRef.setInput('tableHeaders', mockTableHeader);
    fixture.componentRef.setInput('tableData', mockTableDataEmpty);
    fixture.componentRef.setInput('messageEmptyTable', customMessage);

    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const emptyMessageCell = nativeElement.querySelector('td.text-center');

    expect(emptyMessageCell).toBeTruthy();
    expect(emptyMessageCell!.textContent!.trim()).toContain(customMessage);
  });

  it('should render table rows when data is not empty', () => {

    fixture.componentRef.setInput('tableHeaders', mockTableHeader);
    fixture.componentRef.setInput('tableData', mockTableData);

    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    const rows = element.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockTableData.length);

    const firstRowText = rows[0].textContent;
    expect(firstRowText).toContain('João Silva');
    expect(firstRowText).toContain('123.456.789-00');
    expect(firstRowText).toContain('15/06/2022');
    expect(firstRowText).toContain('ATIVO');
    expect(firstRowText).toContain('Premium');

    const emptyCell = element.querySelector('td.text-center');
    expect(emptyCell).toBeNull();
  });

  it('should emit the correct row when Edit buttton clicked', () => {

    fixture.componentRef.setInput('tableHeaders', mockTableHeader);
    fixture.componentRef.setInput('tableData', mockTableData);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    const spy = spyOn(component.editClicked, 'emit');

    const row = element.querySelectorAll('tbody tr')[0];
    const editButton = row.querySelector('.btn-success') as HTMLButtonElement;

    expect(editButton).toBeTruthy();

    editButton.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockTableData[0]);
  });

  it('should emit the correct row when Remove buttton clicked', () => {

    fixture.componentRef.setInput('tableHeaders', mockTableHeader);
    fixture.componentRef.setInput('tableData', mockTableData);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    const spy = spyOn(component.removeClicked, 'emit');

    const row = element.querySelectorAll('tbody tr')[0];
    const removeButton = row.querySelector('.btn-danger') as HTMLButtonElement;

    expect(removeButton).toBeTruthy();

    removeButton.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockTableData[0]);
  });

  it('should pass inputs correctly to ControlTable component', () => {

    fixture.componentRef.setInput('primarySelectLabel', 'Primário');
    fixture.componentRef.setInput('secondarySelectLabel', 'Secundário');
    fixture.componentRef.setInput('buttonActionLabel', 'Adicionar Novo');
    fixture.componentRef.setInput('selectPrimaryControlOptions', mockStatusOptions);
    fixture.componentRef.setInput('selectSecondaryControlOptions', mockPlanosOptions);

    fixture.detectChanges();

    // Obter instância do componente filho
    const controlTableDebug = fixture.debugElement.query(By.directive(ControlTable));
    const child = controlTableDebug.componentInstance as ControlTable;

    // Verificar inputs repassados
    expect(child.primarySelectLabel).toBe('Primário');
    expect(child.secondSelectLabel).toBe('Secundário');
    expect(child.buttonControlLabel).toBe('Adicionar Novo');

    expect(child.primarySelectOptions).toEqual(mockStatusOptions);
    expect(child.secondSelectOptions).toEqual(mockPlanosOptions);
  });

  it('should emit buttonActionClicked when ControlTable emits buttonControlActionClicked', () => {
    fixture.componentRef.setInput('buttonActionLabel', 'Adicionar Novo');
    fixture.detectChanges();

    const spy = spyOn(component.buttonActionClicked, 'emit');
    const controlTableDebug = fixture.debugElement.query(By.directive(ControlTable));

    expect(controlTableDebug).toBeTruthy();
    const controlTable = controlTableDebug.componentInstance as ControlTable;
    controlTable.buttonControlActionClicked.emit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();

  });

  it('should emit selectPrimaryChanged when ControlTable emits primarySelectChanged', () => {
    fixture.componentRef.setInput('primarySelectLabel', 'Primário');
    fixture.componentRef.setInput('selectPrimaryControlOptions', mockStatusOptions);
    fixture.detectChanges();

    const spy = spyOn(component.selectPrimaryChanged, 'emit');

    const controlTableDebug = fixture.debugElement.query(By.directive(ControlTable));
    expect(controlTableDebug).toBeTruthy();
    const controlTable = controlTableDebug.componentInstance as ControlTable;

    controlTable.primarySelectChanged.emit(mockPlanosOptions[0].value);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockPlanosOptions[0].value);
  });

  it('should emit selectSecondaryChanged when ControlTable emits secondarySelectChanged', () => {
    fixture.componentRef.setInput('secondarySelectLabel', 'Secundário');
    fixture.componentRef.setInput('selectSecondaryControlOptions', mockPlanosOptions);
    fixture.detectChanges();

    const spy = spyOn(component.selectSecondaryChanged, 'emit');

    const controlTableDebug = fixture.debugElement.query(By.directive(ControlTable));
    expect(controlTableDebug).toBeTruthy();
    const controlTable = controlTableDebug.componentInstance as ControlTable;


    controlTable.secondSelectChanged.emit(mockPlanosOptions[0].value);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockPlanosOptions[0].value);
  });
});
