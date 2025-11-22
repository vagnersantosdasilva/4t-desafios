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

  it('should show button label when buttonControlLabel is set', () => {
    component.buttonControlLabel = 'Test Button';
    fixture.detectChanges();

    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Test Button');
  });

  it('should show primary select options when primarySelectOptions is set', () => {
    component.primarySelectLabel = 'Primary Select';
    component.primarySelectOptions = [
      { id: '1', value: 'Otion 1', label: 'Option 1' },
      { id: '2', value: 'Option 2', label: 'Option 2' }
    ];
    fixture.detectChanges();

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.options.length).toBe(3);
    expect(selectElement.options[0].text).toBe('Primary Select');
    expect(selectElement.options[1].text).toBe('Option 1');
    expect(selectElement.options[2].text).toBe('Option 2');
  });

  it('should show second select options when secondSelectOptions is set', () => {
    component.secondSelectLabel = 'Second Select';
    component.secondSelectOptions = [
      { id: '1', value: 'Otion 1', label: 'Option 1' },
      { id: '2', value: 'Option 2', label: 'Option 2' }
    ];
    fixture.detectChanges();

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.options.length).toBe(3);
    expect(selectElement.options[0].text).toBe('Second Select');
    expect(selectElement.options[1].text).toBe('Option 1');
    expect(selectElement.options[2].text).toBe('Option 2');
  });

  it('should not show button when buttonControlLabel is undefined', () => {
    component.buttonControlLabel = undefined;
    fixture.detectChanges();

    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement).toBeNull();
  });

  it('should not show select when primarySelectOptions  and secondSelectOptions are undefined', () => {
    component.primarySelectOptions = undefined;
    component.secondSelectOptions = undefined;
    fixture.detectChanges();

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement).toBeNull();
  });

  it('should emit primarySelectChanged when primarySelectChange is called', () => {
    spyOn(component.primarySelectChanged, 'emit');

    // Cria um evento mock
    const mockEvent = {
      target: {
        value: 'Option 1',
        options: [
          { id: '1', value: 'Option 1', label: 'Option 1' },
          { id: '2', value: 'Option 2', label: 'Option 2' }
        ],
        selectedIndex: 1
      }
    } as unknown as Event;

    component.primarySelectChange(mockEvent);

    expect(component.primarySelectChanged.emit).toHaveBeenCalledWith('Option 1');
  });

  it('should emit secondSelectChanged when secondSelectChange is called', () => {
    spyOn(component.secondSelectChanged, 'emit');
    // Cria um evento mock
    const mockEvent = {
      target: {
        value: 'Option 1',
        options: [
          { id: '1', value: 'Option 1', label: 'Option 1' },
          { id: '2', value: 'Option 2', label: 'Option 2' }
        ],
        selectedIndex: 1
      }
    } as unknown as Event;

    component.secondSelectChange(mockEvent);

    expect(component.secondSelectChanged.emit).toHaveBeenCalledWith('Option 1');
  });

  it('should emit buttonControlActionClicked when buttonControlAction is called', () => {
    spyOn(component.buttonControlActionClicked, 'emit');

    component.buttonControlLabel = 'Test Button';
    component.buttonControlAction();

    expect(component.buttonControlActionClicked.emit).toHaveBeenCalled();
  });
});
