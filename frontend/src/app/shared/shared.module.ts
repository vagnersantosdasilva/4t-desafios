import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// IMPORTS DE COMPONENTES DO SHARED
import { Dialog } from './components/dialog/dialog';
import { ControlTable } from './components/control-table/control-table';
import { DinamicTable } from './components/dinamic-table/dinamic-table';
import { Page } from './components/page/page';
import { Header } from './components/header/header';
import { RouterModule } from '@angular/router';
// importe outros componentes shared...

@NgModule({
  declarations: [
    Dialog,
    ControlTable,
    DinamicTable,
    Header,
    Page,
    // outros componentes shared...
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    // exporta tudo o que precisa ser usado fora
    Dialog,
    ControlTable,
    DinamicTable,
    Header,
    Page,
    // outros componentes shared...
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
