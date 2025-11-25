import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { PartialRoute } from './shared/models/routes.model';
import { Header } from './shared/components/header/header';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        App, Header
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Header component with correct routes', () => {
    fixture.detectChanges();

    const headerDebugElement: DebugElement | null = fixture.debugElement.query(
      By.directive(Header)
    );

    expect(headerDebugElement).not.toBeNull();

    const headerComponentInstance = headerDebugElement?.componentInstance as Header;

    expect(headerComponentInstance.routes.length).toBe(component.routes.length);
    expect(headerComponentInstance.routes).toEqual(component.routes);
  });
});
