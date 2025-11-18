import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { HomePage } from './pages/home-page/home-page';
import { BeneficiariosPage } from './pages/beneficiarios-page/beneficiarios-page';
import { PlanosPage } from './pages/planos-page/planos-page';

@NgModule({
  declarations: [
    App,
    Header,
    HomePage,
    BeneficiariosPage,
    PlanosPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
