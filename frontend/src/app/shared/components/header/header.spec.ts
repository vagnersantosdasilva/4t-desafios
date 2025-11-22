import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { RouterTestingModule } from '@angular/router/testing';

import { PartialRoute } from '../../models/routes.model';
import { Router } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let router: Router;

  const mockRoutes: PartialRoute[] = [
    { label: 'Home', path: '/' },
    { label: 'Beneficiários', path: '/beneficiarios' },
    { label: 'Planos', path: '/planos' },
  ];

  const mockRoutesEmpty: PartialRoute[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Header,],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'beneficiarios', component: {} as any },
          { path: 'planos', component: {} as any },
          { path: '', component: {} as any }
        ])
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render routes correctly', () => {

    fixture.componentRef.setInput('routes', mockRoutes);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const routeElements = nativeElement.querySelectorAll('nav a');

    expect(routeElements.length).toBe(mockRoutes.length);

    mockRoutes.forEach((route, index) => {
      const routeElement = routeElements[index];
      expect(routeElement.textContent).toContain(route.label);
      expect(routeElement.getAttribute('href')).toBe(route.path);
    });
  });

  it('should render home link when routes input is empty', () => {

    fixture.componentRef.setInput('routes', mockRoutesEmpty);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const routeElements = nativeElement.querySelectorAll('nav a');

    expect(routeElements.length).toBe(1);

    const homeRouteElement = routeElements[0];
    expect(homeRouteElement.textContent).toContain('Home');
    expect(homeRouteElement.getAttribute('href')).toBe('/');
  });

  it('should navigate to correct routes when links are clicked', async () => {
    fixture.componentRef.setInput('routes', mockRoutes);
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const routeElements = nativeElement.querySelectorAll('nav a');

    for (let i = 0; i < mockRoutes.length; i++) {
      const route = mockRoutes[i];
      const link = routeElements[i] as HTMLAnchorElement;

      link.click();
      fixture.detectChanges();
      // Aguardar a navegação ser completada
      await fixture.whenStable();

      expect(router.url).toBe(route.path);
    }
  });
});
