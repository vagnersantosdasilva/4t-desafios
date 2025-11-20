import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { HomePage } from './pages/home-page/home-page';
import { BeneficiariosPage } from './pages/beneficiarios-page/beneficiarios-page';
import { PlanosPage } from './pages/planos-page/planos-page';
import { Page } from './shared/components/page/page';
import { DinamicTable } from './shared/components/dinamic-table/dinamic-table';
import { HttpClientModule } from '@angular/common/http';
import { ControlTable } from './shared/components/control-table/control-table';


@NgModule({
  declarations: [
    App,
    Header,
    HomePage,
    BeneficiariosPage,
    PlanosPage,
    Page,
    DinamicTable,
    ControlTable
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
