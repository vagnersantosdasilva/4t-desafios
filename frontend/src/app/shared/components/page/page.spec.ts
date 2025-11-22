import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page } from './page';
import { Component } from '@angular/core';

describe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Page]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title when provided', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should not render title when not provided', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement).toBeFalsy();
  });

  it('should not render title when title is undefined', () => {
    fixture.componentRef.setInput('title', undefined);
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement).toBeFalsy();
  });

  it('should not render title when title is empty string', () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement).toBeFalsy();
  });

  it('should update title dynamically when title changes', () => {
    // Teste inicial
    fixture.componentRef.setInput('title', 'Initial Title');
    fixture.detectChanges();

    let titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Initial Title');

    // Atualiza o título
    fixture.componentRef.setInput('title', 'Updated Title');
    fixture.detectChanges();

    titleElement = fixture.nativeElement.querySelector('h2');
    expect(titleElement.textContent).toContain('Updated Title');
  });

  it('should be prepared to receive projected content via ng-content', () => {

    const pageWrapper = fixture.nativeElement.querySelector('.page-wraper');
    expect(pageWrapper).toBeTruthy();

    expect(component).toBeTruthy();
  });
});
